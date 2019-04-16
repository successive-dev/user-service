import VersionableSchema from '../versionable/VersionableSchema';

class UserSchema extends VersionableSchema {
  constructor() {
    const baseSchema = {
      _id: { type: String, required: true },
      emailId: { type: String, required: true },
      name: { type: String, required: true },
      password: { type: String, required: true },
    };
    super(baseSchema);
  }
}

export default UserSchema;
