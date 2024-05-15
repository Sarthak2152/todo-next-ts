import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePasswords(
  hashedPassword: string,
  password: string
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
