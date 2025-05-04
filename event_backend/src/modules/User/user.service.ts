import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../utils/prisma";
import ApiError from "../../errors/ApiError";
import status from "http-status";

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users
}

const createUser = async (
    payload: User
): Promise<User> => {

    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
    };

    const result = await prisma.$transaction(async (tx) => {
        const isExist = await tx.user.findUnique({
            where: {
                email: payload.email
            }
        })
        if(isExist){
            throw new ApiError(status.BAD_REQUEST, "User Already Exist.")
        }
        const create = await tx.user.create({
            data: userData
        })
        return create
    })

    return result;
};
export const userService = {
    createUser,
    getAllUsers
}