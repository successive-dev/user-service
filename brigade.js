const { events, Job } = require("brigadier");
events.on("push", () => {
  var job = new Job("do-nothing", "node:alpine");
  job.tasks = [
    "cd /src",
    "ls -lart",
    "npm i",
    "npm run lint:fix"
  ];

  job.run();
});
