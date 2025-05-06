import status from "http-status";
import ApiError from "../../errors/ApiError";
import prisma from "../../utils/prisma";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt"
import { generateToken } from "../../middlewares/jwtHelpers";
import config from "../../config";

const Login = async (payload: ILogin) => {
    const user = await prisma.user.findFirst({ where: { email: payload.email } });

    if (!user) throw new ApiError(status.NOT_FOUND, 'No user found with this email');

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) throw new ApiError(status.UNAUTHORIZED, 'Invalid email or password');

    const jwtPayload = { id: user.id, email: user.email, role: user.role };

    const access_token = generateToken(jwtPayload, config.jwt.jwt_secret as string, config.jwt.expires_in as string);

    const refresh_token = generateToken(jwtPayload, config.jwt.refresh_token_secret as string, config.jwt.refresh_token_expires_in as string);

    return { access_token, refresh_token };
};

export const AuthService = {
    Login
}