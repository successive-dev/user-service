const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("do-nothing", "alpine:3.8");
  job.tasks = [
    "cd /src",
    "ls -lart"
  ];

  job.run();
});
