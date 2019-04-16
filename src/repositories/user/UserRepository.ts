import { VersionableRepository } from '../versionable';
import { User } from './UserModel';

class UserRepository extends VersionableRepository {
  constructor() {
    super(User);
  }

  public async createUser(data: any) {
    return await super.create(data);
  }

  public async readOneUser(id: any) {
    return await super.readOne(id);
  }

  public async readUsers() {
    return await super.read();
  }

  public async deleteUser(id: any) {
    return await super.delete(id);
  }

  public async updateUser(id: any, dataToUpdate: any) {
    return await super.update(id, dataToUpdate);
  }

  public async findUsersByQuery(data: any) {
    data.deletedAt = undefined;
    return await super.findByQuery(data);
  }
}

export default new UserRepository();
