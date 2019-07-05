const { events, Job } = require("brigadier");
let TaskCollection = require('./deployer');


events.on("push", async (e, project) => {
  try {
    let tc = new TaskCollection(e, project);
    var jsonPayload = JSON.parse(e.payload);

    const values = {
      port: 9000,
      image: {
        repository: 'gcr.io/inner-catfish-242312/user-service-n',
        tag: '$version',
      },
      xyz: "Check",
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
      tc.helmUpgrade('usc', 'usc/user-service', values),
    ];

    let j1 = new Job("lint-check", "node");
    let j2 = new Job("deploy-job", "nxvishal/platform_new");
    j1.storage.enabled = true;
    j2.storage.enabled = true;
    j2.privileged = true;
    j2.shell = "/bin/bash";
    j2.env = {
      DOCKER_DRIVER: "overlay",
      KEY: project.secrets.key,
    }
    j1.tasks = [
      // "cd /mnt/brigade/share",
      // "echo hello_world_whats > hello_world.txt",
      // `echo ${project.secrets.key}`,
      // `echo ${project.secrets.key} > key.json`,
      // "echo key.json"
      // "apt install python",
      // "npm i",
      // "npm run lint:fix",
    ];
    j2.tasks = [
      tc.dockerInit(),
      "echo start",
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
      tc.helmUpgrade('usc-4', 'usc/user-service-4', values),
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
