import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import { eventService } from "./event.service"
import sendResponse from "../../utils/sendResponse"
import status from "http-status"

const createEvent: RequestHandler = catchAsync(async (req, res) => {
    const result = await eventService.createEvent(req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Event Created Successfully",
        success: true,
        data: result
    })
})
const getAllEvents: RequestHandler = catchAsync(async (req, res) => {
    const result = await eventService.getAllEvents()
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Events Fetched Successfully",
        success: true,
        data: result
    })
})
const getSingleEvent: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await eventService.getSingleEvent(id)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Event Fetched Successfully",
        success: true,
        data: result
    })
})
const updateEvent: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await eventService.updateEvent(id, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Event Updated Successfully",
        success: true,
        data: result
    })
})
const deleteEvent: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    await eventService.deleteEvent(id)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Event Deleted",
        success: true,
        data: null
    })
})

export const eventController = {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent
}