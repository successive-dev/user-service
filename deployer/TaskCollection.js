const HelmUpgrade = require('./HelmUpgrade');
class TaskCollection {

	constructor(e, project) {
		this.e = e;
		this.project = project;
	}

	dockerInit() {
		return [
			"dockerd-entrypoint.sh &",
			`printf "waiting for docker daemon"; while ! docker info >/dev/null 2>&1; do printf .; sleep 1; done; echo`,
		]
	}

  gitLogin() {
		// username and password should be passed through brigade secrets
		return [
			`echo https://${this.project.secrets.gitUsername}:${this.project.secrets.gitPassword}@github.com > .git-credentials`,
			"git config credential.helper 'store --file .git-credentials'",
		]
	};

	gitVersion() {
		// repo is github repository
    return [
			"git fetch --tags -q",
			"wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
			"chmod u+x ./gitversion",
			"./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
			`git remote add origin ${this.project.repo.cloneURL}`,
      "git push origin --tags",
		]
	}

	googleLogin() {
		// Assuming that keys are fetched from project.secrets, stringified and passed as
		// environment variable KEY
		return [
			"echo $KEY > key.json",
			"gcloud auth activate-service-account --key-file key.json",
			"gcloud config set project inner-catfish-242312",
		]
	}

  genBuild() {
    return [
      "npm run build"
    ]
  }

	buildImage(name) {
    this.imgName = name;
		return [
			"gcloud auth configure-docker",
      `docker build -t ${name} .`,
		]
	}

	tagAndPush(tag=this.imgName) {
		return [
      "version=$(cat pipeline_app_version.txt)",
			`docker tag ${this.imgName} gcr.io/inner-catfish-242312/${tag}:$version`,
			`docker push gcr.io/inner-catfish-242312/${tag}:$version`,
		];
	}

  pass() {
    return ["tar -cf /mnt/brigade/share/app.tar . --exclude='.git'",];
  }

  retrieve() {
    return ["tar -xf /mnt/brigade/share/app.tar",];
  }

  helmInit() {
    return [
      "helm init --client-only",
    ]
  }

  helmAddRepo(helmRepoURL, helmRepoName) {
    this.helmRepoName = helmRepoName;
    return [
      `helm repo add ${helmRepoName} ${helmRepoURL}`,
    ]
  }

  helmUpgrade(ns, release, chart, values) {
    return new HelmUpgrade(ns, release, chart, values).createUpgradeInstallCommand();
  }
}

module.exports = TaskCollection;
