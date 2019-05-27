const { events, Job } = require("brigadier");
events.on("push", async () => {
  try {
    let j1 = new Job("lint-check", "node");
    let j2 = new Job("deploy-job", "docker:stable-dind");

    j1.tasks = [
      "cd /src",
      "ls -lart",
      "apt install python",
      "npm i",
      "npm run lint:fix",    
    ];
    j2.tasks = [
      "dockerd-entrypoint.sh &",
      `printf "waiting for docker daemon"; while ! docker info >/dev/null 2>&1; do printf .; sleep 1; done; echo`,
      "cd /src",
      "ls -lart",
      "docker build -t nxvishal/user-service .",
      "echo done till here",
      "docker login -u nxvishal -p wJD87CnY45n5Lar",
      "docker push nxvishal/user-service",
    ];
    await j1.run();
    await j2.run();
  } catch (error) {
    console.log(error.message);
    console.log(error.lineNumber);
  }
});
