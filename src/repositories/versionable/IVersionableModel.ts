import { Document } from 'mongoose';
export default interface IVersionableModel extends Document {
  _id: string;
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
}
