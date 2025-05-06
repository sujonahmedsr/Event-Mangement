import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";
import { RequestHandler } from "express";

const Login: RequestHandler = catchAsync(async (req, res) => {
    const result = await AuthService.Login(req.body);
    const { access_token, refresh_token } = result;
    res.cookie('REFRESH_TOKEN', refresh_token,
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    sendResponse(res,
        {
            success: true,
            statusCode: status.OK,
            message: 'Login successful',
            data: { access_token }
        });
});

export const AuthController = {
    Login
}