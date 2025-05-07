import { Router } from "express";
import { eventController } from "./event.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createEventZodSchema, updateEventZodSchema } from "./event.validation";

const route = Router()

route.post('/', validateRequest(createEventZodSchema), eventController.createEvent)
route.get('/', eventController.getAllEvents)
route.get('/:id', eventController.getSingleEvent)
route.patch('/:id', validateRequest(updateEventZodSchema), eventController.updateEvent)
route.delete('/:id', eventController.deleteEvent)

export const EventRoutes = route
