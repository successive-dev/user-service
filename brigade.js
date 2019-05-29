const { events, Job } = require("brigadier");


events.on("push", () => {
// Create a new job
var dockerBuild = new Job("dockerbuild")

dockerBuild.image = "docker:dind"
dockerBuild.privileged = true;

dockerBuild.env = {
DOCKER_DRIVER: "overlay"
}


dockerBuild.tasks = [
"dockerd-entrypoint.sh &", // Start the docker daemon
"sleep 20", // Grant it enough time to be up and running
"cd /src/", // Go to the project checkout dir
"ls -lart",
"docker version"
];

dockerBuild.run()



})


// const { events, Job } = require("brigadier");
// events.on("push", async () => {
//   try {
//     let j1 = new Job("lint-check", "node");
//     let j2 = new Job("deploy-job", "docker:dind");
//     j2.privileged = true;
//     j2.env = {
//       DOCKER_DRIVER: "overlay"
//     }
//     j1.tasks = [
//       "cd /src",
//       "ls -lart",
//       "apt install python",
//       "npm i",
//       "npm run lint:fix",    
//     ];
//     j2.tasks = [
//       "dockerd-entrypoint.sh &",
//       // `printf "waiting for docker daemon"; while ! docker info >/dev/null 2>&1; do printf .; sleep 1; done; echo`,
//       "sleep 20",
//       "docker version",
//       "docker info",
//       "cd /src",
//       "ls -lart",
//       // "docker build -t nxvishal/user-service .",
//       // "echo done till here",
//       // "docker login -u nxvishal -p wJD87CnY45n5Lar",
//       // "docker push nxvishal/user-service",
//     ];
//     // await j1.run();
//      j2.run();
//   } catch (error) {
//     console.log(error.message);
//     console.log(error.lineNumber);
//   }
// });
