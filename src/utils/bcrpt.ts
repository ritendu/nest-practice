import * as bcrypt from 'bcrypt';

export const hashPassword = async (rawPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(rawPassword, salt);
  return password;
};

export const comparePassword = async (
  newPassword: string,
  oldPassword: string,
) => {
  return await bcrypt.compare(newPassword, oldPassword);
};
