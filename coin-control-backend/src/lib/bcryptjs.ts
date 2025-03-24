import { hashSync, compareSync } from 'bcryptjs';

export async function hashPassword(password: string) {
    return await hashSync(password, 6);
}

export async function comparePassword(password: string, hash: string) {
    return await compareSync(password, hash);
}
