class TaskCollection {

	constructor(e, project) {
		this.e = e;
		this.project = project;
	}

  gitLogin() {

		// username and password should be passed through brigade secrets

		return [
			`echo https://${this.project.secrets.gitUsername}:${this.project.secrets.gitPassword}@github.com > .git-credentials`,
			"git config credential.helper 'store --file .git-credentials'",	
		]
	};

	googleLogin() {
		// return [
		// 	type : project.secrets.type,
    //   project_id : project.secrets.project_id,
    //   private_key_id : project.secrets.private_key_id,
    //   private_key : project.secrets.private_key,
    //   client_email : project.secrets.client_email,
    //   client_id : project.secrets.client_id,
    //   auth_uri : project.secrets.auth_uri,
    //   token_uri : project.secrets.token_uri,
    //   auth_provider_x509_cert_url : project.secrets.auth_provider_x509_cert_url,
    //   client_x509_cert_url : project.secrets.client_x509_cert_url,
		// ]
	}




}

module.exports = TaskCollection;