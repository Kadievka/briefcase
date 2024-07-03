import JWTBlackListService from '../src/services/JWTBlackList.service';

export default async function cleanJWTBlackList(_args: string[]) {
    const jwtBlackListService: JWTBlackListService = JWTBlackListService.getInstance();
    await jwtBlackListService.deleteManyJWT();
}
