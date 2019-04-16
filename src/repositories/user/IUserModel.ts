import { IVersionableModel } from '../versionable/';
export default interface IUserModel extends IVersionableModel {
  emailId: string;
  name: string;
  password: string;
}
