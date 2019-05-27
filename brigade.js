const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("lint-check", "node:alpine");
  job.tasks = [
    "cd /src",
    "ls -lart",
  ];

  job.run();
});
