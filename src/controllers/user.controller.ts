import { Request, Response } from 'express';

import {
  readUser,
  readUsers,
  insertUser,
  updatedUser,
} from '../services/user.services';

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  const user = await readUser(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.status(200).json({ user });
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await readUsers();

  if (!users) return res.status(400).json({ message: 'Users not exists' });

  return res.status(200).json({ users });
};

export const createUser = async ({ body }: Request, res: Response) => {
  const user = await insertUser(body);

  if (!user) return res.status(400).json({ message: 'User incorrect' });

  return res.status(200).json({ user });
};

export const updateUser = async ({ body, params }: Request, res: Response) => {
  const userId = parseInt(params.userId);

  const user = await updatedUser(userId, body);

  if (!user) return res.status(400).json({ message: 'User not found' });

  return res.status(200).json({ user });
};
