import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { userService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers()
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  });

const createUser = catchAsync(async (req: Request, res: Response) => {
    await userService.createUser(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User Created successfully!",
        data: null,
    });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.getSingleUser(id)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  });

export const userController = {
    getAllUsers,
    createUser,
    getUserByEmail
}