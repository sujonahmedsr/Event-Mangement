import { Request, RequestHandler, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import status from "http-status"
import { participantService } from "./participant.service"

const createParticipant = catchAsync(async (req: Request & {user?: any}, res: Response) => {
    const { eventId } = req.params
    const { id: userId } = req.user
    const result = await participantService.createParticipant(eventId, userId)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Participant Created Successfully",
        success: true,
        data: result
    })
})
const getAllParticipants: RequestHandler = catchAsync(async (req, res) => {
    const result = await participantService.getAllParticipants()
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Participants Fetched Successfully",
        success: true,
        data: result
    })
})
const getSingleParticipant: RequestHandler = catchAsync(async (req, res) => {
    const { eventId } = req.params
    const result = await participantService.singleParticipant(eventId)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Participant Fetched Successfully",
        success: true,
        data: result
    })
})
const deleteParticipant: RequestHandler = catchAsync(async (req, res) => {
    const { eventId } = req.params
    await participantService.deleteParticipants(eventId)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Participant Deleted",
        success: true,
        data: null
    })
})

export const participantController = {
    createParticipant,
    getAllParticipants,
    getSingleParticipant,
    deleteParticipant
}