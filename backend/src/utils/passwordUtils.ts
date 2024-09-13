import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // The cost factor for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

