const { events, Job } = require("brigadier");
events.on("push", () => {
  let job = new Job("lint-check", "node");
  let deployjob = new Job("Deploy-job", "docker");

  job.tasks = [
    "cd /src",
    "ls -lart",
    "apt install python",
    "npm i",
    "npm run lint:fix",    
  ];
  deployjob.tasks = [
    "docker build -t nxvishal/user-service:base .",
    "docker login -u nxvishal -p wJD87CnY45n5Lar",
    "docker push nxvishal/user-service:base"
  ]

  await job.run();
  await deployjob.run();
});
