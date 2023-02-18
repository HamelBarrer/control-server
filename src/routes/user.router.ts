import { Router } from 'express';

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/:userId', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);

export default router;
