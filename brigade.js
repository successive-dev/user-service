const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("lint-check", "node");
  job.tasks = [
    "cd /src",
    "ls -lart",
    "apt install python",
    "npm i",
  ];

  job.run();
});
