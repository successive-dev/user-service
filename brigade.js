const { events, Job } = require("brigadier");
events.on("push", async () => {
  try {
    let j1 = new Job("lint-check", "node");
  let j2 = new Job("Deploy-job", "docker");

  j1.tasks = [
    "cd /src",
    "ls -lart",
    "apt install python",
    "npm i",
    "npm run lint:fix",    
  ];
  j2.tasks = [
    "docker build -t nxvishal/user-service:base .",
    "docker login -u nxvishal -p wJD87CnY45n5Lar",
    "docker push nxvishal/user-service:base"
  ];

  await j1.run();
  await j2.run();
  } catch (error) {
    console.log(error);
  }
});
