import axios from 'axios';
import { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { configuration } from '../../config';
import userRepo from '../../repositories/user/UserRepository';

const headers = {
  'Accept' : 'application/json',
  'Authorization': `SSWS ${configuration.apiToken}`,
  'Content-Type': 'application/json',
};

class UserClass {
  public async getById(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const id = req.params.id;
    //   // tslint:disable-next-line: no-shadowed-variable
    //   const user = await userRepo.readOneUser(id);
    //   res.send(user);
    // } catch (err) {
    //   return next({ error: 'Bad Request', status: 400 });
    // }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log('Pre Get req from controller user_service');
      const { data } = await axios.get(`${configuration.url}/api/v1/users?limit=25`, {
        headers,
      });
      // console.log('Post Get req from controller user_service');
      // console.log(data);
      res.send(data);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async post(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body;
    const userInfo = { ...data};
    const {
      firstName,
      lastName,
      email,
      login,
      mobilePhone,
      password,
    } = userInfo;
    try {
      // console.log('PRE-REQ-SENT-CHECK');
      const result = await axios.post(`${configuration.url}/api/v1/users?activate=false`, {
        credentials: {
          password: { value: password},
        },
        profile: {
          email,
          firstName,
          lastName,
          login,
          mobilePhone,
        },
      }, { headers });
      // console.log('POST-REQ-SENT-CHECK');
      // console.log(res.data);
      res.send(result.data);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const { id, dataToUpdate } = req.body;
    //   const updatedUser = await userRepo.updateUser(id, dataToUpdate);
    //   res.send(updatedUser);
    // } catch (error) {
    //   return next({ error: error.message, status: 400 });
    // }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const deletedUser = await userRepo.deleteUser(id);
  //     res.send(deletedUser);
  //   } catch (error) {
  //     return next({ error: error.message, status: 400 });
  //   }
  // }
  }
}

const user = new UserClass();

export default user;
