// const HelmUpgrade = require('./HelmUpgrade');
const TaskCollection = require('./TaskCollection');

const tc = new TaskCollection();

values = {
  key1: 'value1',
  key2: 'value2'
}

let pipeline = [
  tc.dockerInit(),
  "cd /src",
  // ...tc.gitLogin(),
  // ...tc.gitVersion(),
  // ...tc.googleLogin(),
  "npm install",
  "npm i nodemon",
  "npm run build",
  // ...tc.buildImage('user-service-n'),
  // ...tc.tagAndPush(),
  "echo done",
  tc.helmInit(),
  tc.helmAddRepo('https://successive-dev.github.io/usc/', 'usc'),
  tc.helmUpgrade('usc', 'usc/user-service', values)
]
console.log(pipeline);
