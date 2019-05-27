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
  // var deployjob = new Job("Deploy-job", "docker");
  // deployjob.tasks = [
  //   "docker build -t nxvishal/user:1.0 .",
  //   ""
  // ]

  job.run();
});
