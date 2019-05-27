const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("lint-check", "node");
  job.tasks = [
    "cd /src",
    "ls -lart",
    "apt install python",
    "npm i",
    "npm run lint:fix",    
  ];
  var deployjob = new Job("Deploy-job", "docker");
  deployjob.tasks = [
    "docker build -t nxvishal/user-service:base .",
    "docker login -u nxvishal -p wJD87CnY45n5Lar",
    "docker push nxvishal/user-service:base"
  ]

  job.run();
  deployjob.run();
});
