const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("do-nothing", "alpine:3.8");
  job.tasks = [
    "echo Hello",
    "echo World",
    "echo Vishal",
    "echo random stuff",
    "echo Tewatia",
    "echo more changes",
    "echo even more changes",
  ];

  job.run();
});
