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
		
	}




}

module.exports = TaskCollection;