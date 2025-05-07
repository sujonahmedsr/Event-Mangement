import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import prisma from "../../utils/prisma";
import ApiError from "../../errors/ApiError";
import status from "http-status";

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            is_deleted: true,
            created_at: true,
            updated_at: true
        }
    });
    return users
}

const getSingleUser = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id }, 
        include: {
            event: true,
            received_invitations: true,
            sent_invitations: true
    } });
    if(!user){
        throw new ApiError(status.NOT_FOUND, "User not found.")
    }
    return user
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
    getSingleUser,
    getAllUsers
}