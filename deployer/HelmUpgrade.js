class HelmUpgrade {

  constructor(release, chart, values, ns = 'default') {
    this.release = release;
    this.chart = chart;
    this.values = values;
    this.ns = ns;
    this.usingCentralHelmRepository = false;
  }
  flatten(obj, stack, results, checkPropertyDefined = false) {
    if (["string", "number", "boolean"].includes(typeof obj)) {
      let setter = stack + '=' + ((typeof obj === 'string') ? "\"" + obj + "\"" : obj);

      results.push(setter[0] == '.' ? setter.substring(1) : setter)
    }
    else {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] === "object") {
            if (Array.isArray(obj[property])) {
              for (var i in obj[property]) {
                let val = obj[property][i];
                this.flatten(val, stack + '.' + property + '[' + i + ']', results, checkPropertyDefined);
              }
            }
            else {
              this.flatten(obj[property], stack + '.' + property, results, checkPropertyDefined);
            }
          }
          else {
            if (checkPropertyDefined && obj[property] === undefined) {
              console.log(checkPropertyDefined)
              throw ("Undefined value for helm setter '" + property + "' and checkPropertyDefined is " + checkPropertyDefined)
            }

            this.flatten(obj[property], stack + '.' + property, results, checkPropertyDefined)
          }
        }
      }
    }
  }

  createUpgradeInstallCommand(checkPropertyDefined = false, ciNamespace = null) {
    this.validateValues(this.values);

    let command = "";
    if (this.usingCentralHelmRepository) {
      command += ["helm init --client-only",
        `helm repo add --username=$CHARTMUSEUM_USERNAME --password=$CHARTMUSEUM_PASSWORD ${ciNamespace}-chartmuseum http://chartmuseum-${ciNamespace}-chartmuseum.${ciNamespace}.svc.cluster.local:8080`,
        "echo $HELM_PUBLIC_KEY | base64 -d > ~/helm-public-key.gpg"].join("\n") + "\n";
    }

    command += `helm upgrade \\\n  --namespace ${this.ns} \\\n`;

    let results = [];
    this.flatten(this.values, '', results, checkPropertyDefined);

    for (var i in results) {
      command += `  --set ${results[i]} \\\n`
    }

    command += `${this.release} ${this.chart}`

    if (this.usingCentralHelmRepository) {
      command += ` --verify --keyring ~/helm-public-key.gpg --version $APP_SEMVER`
    }

    return command;
  }

  validateValues(values) {
    if (values.ingress && !Array.isArray(values.ingress.hosts)) {
      throw new Error("Value for ingress.hosts expected to be an array but was " + (typeof values.ingress.hosts))
    }
  }
}

// let helm = new HelmUpgrade('default', 'test-release', 'test', values).createUpgradeInstallCommand()
// console.log(helm);
module.exports = HelmUpgrade
