import bcrypt from 'bcryptjs';

export const hashPassword = async (p: string) => bcrypt.hash(p, 10);
export const comparePassword = async (p: string, hash: string) => bcrypt.compare(p, hash);
