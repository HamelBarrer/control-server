import { Request, Response } from 'express';
import { getUserUsernameOrEmail } from '../services/user.services';
import { validationHash } from '../utils/hash';
import { createToken } from '../utils/token';

export const login = async ({ body }: Request, res: Response) => {
  const user = await getUserUsernameOrEmail(body);

  if (!user)
    return res.status(404).json({ message: 'Account or Password incorrect' });

  if (!(await validationHash(user.password, body.password)))
    return res.status(404).json({ message: 'Account or Password incorrect' });

  const jwt = await createToken(user.user_id);

  return res.status(200).json({ jwt });
};
