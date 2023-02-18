import { Router } from 'express';

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../controllers/user.controller';
import { validationUser } from '../middleware/validationUser';

const router = Router();

router.get('/:userId', getUser);
router.get('/', validationUser, getUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);

export default router;
