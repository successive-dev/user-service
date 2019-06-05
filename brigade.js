const { events, Job } = require("brigadier");

events.on("push", async (e, project) => {
  try { 
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
    console.log(keys);
    let j1 = new Job("lint-check", "node");
    let j2 = new Job("deploy-job", "nxvishal/dtog");
    j2.privileged = true;
    j2.env = { 
      DOCKER_DRIVER: "overlay",
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
    j1.tasks = [
      "cd /src",
      // "ls -lart",
      "apt install python",
      "npm i",
      "npm run lint:fix",    
    ];
    j2.tasks = [
      "dockerd-entrypoint.sh &",
      `printf "waiting for docker daemon"; while ! docker info >/dev/null 2>&1; do printf .; sleep 1; done; echo`,
    //   "sleep 20",
      "docker version",
      // "gcloud",
      "cd /src",
      // "echo $KEYS > key.json",
      "echo $project_id",
      "ls -lart",
      // "gcloud auth activate-service-account --key-file key.json",
      // "gcloud config set project inner-catfish-242312",
      // "echo ========Account Details===========",
      // "gcloud config list",
      // "echo ==================================",
      // "gcloud auth configure-docker",
      // "docker build -t user-service .",
      // "docker tag user-service gcr.io/inner-catfish-242312/user-service",
      // "echo done till here",
      // "docker push gcr.io/inner-catfish-242312/user-service"
      // "docker login -u nxvishal -p wJD87CnY45n5Lar",
      // "docker push nxvishal/user-service",
    ];
    // await j1.run();
    await  j2.run();
  } catch (error) {
    console.log(error.message);
    console.log(error.lineNumber);
  }
});
