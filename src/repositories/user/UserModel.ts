import { Model, model } from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';

// interface IUserModel extends mongoose.Document {}

export const User: Model<IUserModel> = model<IUserModel>('User', new UserSchema());
