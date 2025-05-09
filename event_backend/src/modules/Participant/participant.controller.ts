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
const participants: RequestHandler = catchAsync(async (req, res) => {
    const { eventId } = req.params
    const result = await participantService.participants(eventId)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Participant Fetched Successfully",
        success: true,
        data: result
    })
})

export const participantController = {
    createParticipant,
    participants,
}