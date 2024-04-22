import { JwtPayload } from 'jsonwebtoken';
export default interface IUserSignature extends JwtPayload {
    email: string;
    name: string;
}
