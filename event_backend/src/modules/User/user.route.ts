import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userSchema } from "./user.validation";

const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.post('/', validateRequest(userSchema), userController.createUser)

export default userRoute