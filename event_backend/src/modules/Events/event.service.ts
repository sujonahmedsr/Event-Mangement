import { Event } from "@prisma/client";
import prisma from "../../utils/prisma";
import ApiError from "../../errors/ApiError";
import status from "http-status";

const createEvent = async (payload: Event) => {
    const isCreatorExist = await prisma.user.findUnique({
        where: {
            id: payload.creatorId
        }
    })

    if(!isCreatorExist){
        throw new ApiError(status.NOT_FOUND, "Creator Not Found.")
    }
    
    const result = await prisma.event.create({
        data: payload
    })
    return result
}
const getAllEvents = async () => {
    console.log("getAllEvents create");
}
const singleEvent = async () => {
    console.log("single create");
}
const updateEvents = async () => {
    console.log("update create");
}
const deleteEvents = async () => {
    console.log("deletes create");
}
export const eventService = {
    createEvent,
    getAllEvents,
    singleEvent,
    updateEvents,
    deleteEvents
}