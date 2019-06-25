class TaskCollection {

	constructor(e, project) {
		this.e = e;
		this.project = project;
	}

	dockerStart() {
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

	gitVersion(repo) {
		// repo is github repository
		return [
			"git fetch --tags -q",
			"wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
			"chmod u+x ./gitversion",
			"./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
			`git remote add origin ${repo}`,
      "git push origin --tags",
		]
	}

	googleLogin() {
		// Assuming that keys are fetched from project.secrets, stringified and passed as
		// environment variable KEY
		return [
			// "echo ********** Signing-in to google account",
			"echo $KEY > key.json",
			"gcloud auth activate-service-account --key-file key.json",
			"gcloud config set project inner-catfish-242312",
			// "echo ========Account Details===========",
			// "gcloud config list",
			// "echo ==================================",
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

	tagAndPush() {
		return [
      "version=$(cat pipeline_app_version.txt)",
			`docker tag user-service gcr.io/inner-catfish-242312/${this.imgName}:$version`,
			`docker push gcr.io/inner-catfish-242312/${this.imgName}:$version`,
		]
	}

  pass() {
    return "tar -cf /mnt/brigade/share/app.tar . --exclude='.git'"
  }

  retrieve() {
    return "tar -xf /mnt/brigade/share/app.tar"
  }
}

module.exports = TaskCollection;
