import { Schema } from 'mongoose';

export default class VersionableSchema extends Schema {
  constructor(userSchema: any) {
    const VersionSchema = Object.assign(
      {
        createdAt: {
          default: new Date(),
          required: true,
          type: Date,
        },
        deletedAt: {
          required: false,
          type: Date,
        },
        originalId: {
          required: true,
          type: String,
        },
      },
      userSchema,
    );
    super(VersionSchema);
  }
}
