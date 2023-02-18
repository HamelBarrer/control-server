import { hash, verify } from 'argon2';

export const creationHash = async (text: string): Promise<string | null> => {
  try {
    return await hash(text);
  } catch (error) {
    return null;
  }
};

export const validationHash = async (
  textHash: string,
  text: string
): Promise<boolean> => {
  try {
    return await verify(textHash, text);
  } catch (error) {
    return false;
  }
};
