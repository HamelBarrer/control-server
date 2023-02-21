import { PrismaClient } from '@prisma/client';
import { Authentication } from '../interfaces/authentication.interface';
import { User, UserCreate } from '../interfaces/user.interface';
import { creationHash } from '../utils/hash';

export const getUserUsernameOrEmail = async (
  authentication: Authentication
) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: authentication.account,
          },
          {
            username: authentication.account,
          },
        ],
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

export const readUser = async (userId: number): Promise<User | null> => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        username: true,
        email: true,
      },
    });

    if (!user) return null;

    return user as User;
  } catch (error) {
    return null;
  }
};

export const readUsers = async (): Promise<User[] | null> => {
  try {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        email: true,
        created_at: true,
      },
    });

    if (users.length === 0) return null;

    return users as User[];
  } catch (error) {
    return null;
  }
};

export const insertUser = async (user: UserCreate): Promise<User | null> => {
  try {
    const prisma = new PrismaClient();
    const password = await creationHash(user.password);

    if (!password) return null;

    const person = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password,
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        created_at: true,
      },
    });

    return person as User;
  } catch (error) {
    return null;
  }
};

export const updatedUser = async (
  userId: number,
  user: User
): Promise<User | null> => {
  try {
    const prisma = new PrismaClient();

    const person = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        username: user.username,
        email: user.email,
      },
      select: {
        user_id: true,
        username: true,
        email: true,
      },
    });

    return person as User;
  } catch (error) {
    return null;
  }
};
