const { events, Job } = require("brigadier");


events.on("push", async (e, project) => {
  try {
    // console.log("================================", e, "================================");
    // console.log("================================", project, "================================");
    var jsonPayload = JSON.parse(e.payload);
    const keys = {
      type : project.secrets.type,
      project_id : project.secrets.project_id,
      private_key_id : project.secrets.private_key_id,
      private_key : project.secrets.private_key,
      client_email : project.secrets.client_email,
      client_id : project.secrets.client_id,
      auth_uri : project.secrets.auth_uri,
      token_uri : project.secrets.token_uri,
      auth_provider_x509_cert_url : project.secrets.auth_provider_x509_cert_url,
      client_x509_cert_url : project.secrets.client_x509_cert_url,
    }
    // console.log(keys);
    const keys_stringified = JSON.stringify(keys);
    // let j1 = new Job("lint-check", "node");
    let j2 = new Job("deploy-job", "nxvishal/platform");
    // j1.storage.enabled = true;
    j2.storage.enabled = true;
    j2.privileged = true;
    j2.env = { 
      DOCKER_DRIVER: "overlay",
      KEY: keys_stringified,
    }
    // j1.tasks = [
    //   "cd /mnt/brigade/share",
    //   "echo hello_world > hello_world.txt",
    //   // "apt install python",
    //   // "npm i",
    //   // "npm run lint:fix",    
    // ];
    j2.tasks = [

      // init
      "dockerd-entrypoint.sh &",
      `printf "waiting for docker daemon"; while ! docker info >/dev/null 2>&1; do printf .; sleep 1; done; echo`,
      "cd /src",
      "echo project  " + project.secrets.type,
      // "cd /mnt/brigade/share",
      // "cat hello_world.txt",

      // get version of repo
      // "git fetch --tags -q",
      // "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
      // "chmod u+x ./gitversion",
      // "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
      // "version=$(cat pipeline_app_version.txt)",

      // git authentication
      // 'echo https://successive-dev:uzL623NGxG2Nz9z@github.com > .git-credentials',
      // "git config credential.helper 'store --file .git-credentials'",

      // push tags
      // "git remote add origin https://github.com/successive-dev/user-service",
      // "git push origin --tags",

      // create key.json and google auth
      // "echo $KEY > key.json",
      // "gcloud auth activate-service-account --key-file key.json",
      // "gcloud config set project inner-catfish-242312",
      // "echo ========Account Details===========",
      // "gcloud config list",
      // "echo ==================================",

      // remove key
      // "rm key.json",

      // generating build
      // "apk add npm",
      // "npm install",
      // "npm i nodemon",
      // "npm run build",

      // generating, tagging and pushing the image
      // "gcloud auth configure-docker",
      // "docker build -t user-service .",
      // "docker tag user-service gcr.io/inner-catfish-242312/user-service:$version",
      // "echo done till here",
      // "docker push gcr.io/inner-catfish-242312/user-service:$version",

      // updating helm chart with latest version of build image
      // "helm init --client-only",
      // "helm ls",
      // "helm repo add usc https://successive-dev.github.io/usc/",
      // "helm upgrade --set image.tag=$version usc usc/user-service" 
    ];
    if(e.type == 'push'){
      if(jsonPayload.ref == "refs/heads/master") {
        // await j1.run();
        await j2.run();
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});
