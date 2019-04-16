import { Types } from 'mongoose';
import { IUserModel } from '../user';

export default class VersionableRepository {
  private model: any;

  constructor(userModel: any) {
    this.model = userModel;
  }

  public async create(data: any) {
    try {
      const originalId = this.genObjectId();
      const id = originalId;
      Object.assign(data, { _id: id, originalId });
      return await this.model.create(data);
    } catch (ex) {
      throw new Error("Can't create document");
    }
  }

  public async readOne(originalId: any) {
    try {
      return await this.model.findOne({
        deletedAt: { $exists: false },
        originalId,
      });
    } catch (ex) {
      throw new Error('No document found');
    }
  }

  public async read() {
    try {
      return await this.model.find({ deletedAt: { $exists: false } });
    } catch (ex) {
      throw new Error('No document found');
    }
  }

  public genObjectId() {
    return Types.ObjectId();
  }

  public async updateDeletedAt(originalId: any) {
    try {
      return await this.model.updateOne(
        { originalId, deletedAt: { $exists: false } },
        { $set: { deletedAt: new Date() } },
      );
    } catch (err) {
      throw new Error("Can't delete the document");
    }
  }

  public async update(originalId: any, dataToUpdate: any) {
    try {
      const doc = await this.readOne(originalId);
      const previousDoc: IUserModel = doc.toObject();
      delete previousDoc._id;
      delete previousDoc.createdAt;

      // Replicating the updated data into previous data
      const newDoc = Object.assign(previousDoc, dataToUpdate);

      // Invalidating the previous data/document
      await this.updateDeletedAt(originalId);

      newDoc.createdAt = new Date();
      newDoc._id = this.genObjectId();
      return await this.model.create(newDoc);
    } catch (err) {
      throw new Error('Unable to properly update document');
    }
  }

  public async delete(id: any) {
    return this.updateDeletedAt(id);
  }

  public async findByQuery(data: any) {
    try {
      const { limit, skip } = data;
      delete data.limit;
      delete data.skip;
      return await this.model.find(data, undefined, { limit, skip });
    } catch (err) {
      throw new Error('Unable to find document by query');
    }
  }
}
