import { Request, Response, NextFunction } from 'express';
import { validationToken } from '../utils/token';

export const validationUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token?.toLowerCase().startsWith('bearer'))
    return res.status(404).json({ message: 'Information not found' });
  const jwt = token.substring(7);

  const userId = await validationToken(jwt);
  if (!userId)
    return res.status(404).json({ message: 'Information not found' });

  return next();
};
