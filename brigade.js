const { events, Job } = require("brigadier")

var driver = "overlay"

// Build and push a Docker image.
const docker = new Job("dind2", "docker:stable-dind");
docker.privileged = true;
docker.env = {
  DOCKER_DRIVER: driver
}
docker.tasks = [
  "dockerd-entrypoint.sh &",
  `sleep 30`,
  "docker info",
  "cd /src",
  "apk add curl",
  "VERSION=1.5.0",
  "OS=linux",
  "ARCH=amd64",
  "curl -fsSL `https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz` | tar xz --to-stdout ./docker-credential-gcr > /usr/bin/docker-credential-gcr && chmod +x /usr/bin/docker-credential-gcr",
  "echo ================================== login in ==========================================",
  "docker-credential-gcr gcr-login > logs.txt",
  "echo logs.txt"
];


events.on("push", () => {
  docker.run()
})
