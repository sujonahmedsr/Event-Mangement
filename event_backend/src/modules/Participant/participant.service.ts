import StatusCode from "http-status"
import ApiError from "../../errors/ApiError"
import prisma from "../../utils/prisma"

const createParticipant = async (eventId: string, userId: string) => {
    const event = await prisma.event.findUnique({ where: { id: eventId, is: false } });
    if (!event) throw new ApiError(StatusCode.NOT_FOUND, "Event not found.");

};


const getAllParticipants = async () => {
    const result = await prisma.participation.findMany({
        where: {
            isDeleted: false
        },
        include: { user: true, event: true }
    })
    return result
}
const singleParticipant = async (id: string) => {
    const result = await prisma.participation.findFirst({
        where: {
            id,
            isDeleted: false
        },
        include: {
            user: true,
            event: true
        }
    });
    return result;
};

const deleteParticipants = async (eventId: string) => {
    const result = await prisma.participation.update({
        where: {
            id: eventId
        },
        data: {
            isDeleted: true
        }
    })
    return result
}
export const participantService = {
    createParticipant,
    getAllParticipants,
    singleParticipant,
    deleteParticipants
}