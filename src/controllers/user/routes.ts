import * as express from 'express';
import user from './Controller';

const router = express.Router();

router
  .get(
    '/:id',
    user.getById,
  )
  .get(
    '/',
    user.get,
  )
  .post(
    '/',
    user.post,
  )
  .put(
    '/',
    user.put,
  )
  .delete(
    '/:id',
    user.delete,
  );

export default router;
