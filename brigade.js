const { events, Job } = require("brigadier");
let TaskCollection = require('./deployer');


events.on("push", async (e, project) => {
  try {
    let tc = new TaskCollection(e, project);
    // console.log("================================", e, "================================");
    // console.log("================================", project, "================================");
    var jsonPayload = JSON.parse(e.payload);
    // console.log(typeof (project.secrets));
    // console.log(project.secrets);
    const keys = {
      type: project.secrets.type,
      project_id: project.secrets.project_id,
      private_key_id: project.secrets.private_key_id,
      private_key: project.secrets.private_key,
      client_email: project.secrets.client_email,
      client_id: project.secrets.client_id,
      auth_uri: project.secrets.auth_uri,
      token_uri: project.secrets.token_uri,
      auth_provider_x509_cert_url: project.secrets.auth_provider_x509_cert_url,
      client_x509_cert_url: project.secrets.client_x509_cert_url
    }

    const values = {
      port: 9000,
      image: {
        repository: 'gcr.io/inner-catfish-242312/user-service-n',
        tag: '$version',
      },
    }

    let pipeline = [
      `echo ${project.secrets.key}`,
      tc.dockerInit(),
      "cd /src",
      tc.gitLogin(),
      tc.gitVersion(),
      tc.googleLogin(),
      "npm install",
      "npm i nodemon",
      "npm run build",
      tc.buildImage('user-service-n'),
      tc.tagAndPush(),
      "echo done",
      tc.helmInit(),
      tc.helmAddRepo('https://successive-dev.github.io/usc/', 'usc'),
      tc.helmUpgrade('usc', 'usc/user-service', values)
    ];

    console.log(pipeline);
    // console.log(keys);
    const keys_stringified = JSON.stringify(keys);
    let j1 = new Job("lint-check", "node");
    let j2 = new Job("deploy-job", "nxvishal/platform_new");
    j1.storage.enabled = true;
    j2.storage.enabled = true;
    j2.privileged = true;
    j2.shell = "/bin/bash";
    j2.env = {
      DOCKER_DRIVER: "overlay",
      KEY: keys_stringified,
    }
    j1.tasks = [
      "cd /mnt/brigade/share",
      "echo hello_world_whats > hello_world.txt",
      `echo ${project.secrets.key}`,
      `echo ${project.secrets.key} > key.json`,
      "echo key.json"
      // "apt install python",
      // "npm i",
      // "npm run lint:fix",
    ];
    j2.tasks = [
      tc.dockerInit(),
      "cd /src",
      tc.gitLogin(),
      tc.gitVersion(),
      tc.googleLogin(),
      "npm install",
      "npm i nodemon",
      "npm run build",
      tc.buildImage('user-service-n'),
      tc.tagAndPush(),
      "echo done",
      tc.helmInit(),
      tc.helmAddRepo('https://successive-dev.github.io/usc/', 'usc'),
      tc.helmUpgrade('usc-3', 'usc/user-service-3', values)
      // // updating helm chart with latest version of build image
      // "helm init --client-only",
      // "helm ls",
      // "helm repo add usc https://successive-dev.github.io/usc/",
      // "helm upgrade --set image.tag=$version usc usc/user-service"
    ];
    if (e.type == 'push') {
      if (jsonPayload.ref == "refs/heads/master") {
        // await j1.run();
        await j2.run();
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});
