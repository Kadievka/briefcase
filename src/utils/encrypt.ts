
import bcrypt from "bcryptjs";

export function encrypt(saltRounds: number, stringToEncrypt: string): string {
    let hash: string = "";
    const salt: string = bcrypt.genSaltSync(saltRounds);
    hash = bcrypt.hashSync(stringToEncrypt.toString(), salt);
    return hash;
}

export function isMatching(stringToCompare: string, hash: string): boolean {
    return bcrypt.compareSync(stringToCompare, hash);
}
