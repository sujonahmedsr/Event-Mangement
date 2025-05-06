import { Router } from "express";
import { eventController } from "./event.controller";

const route = Router()

route.post('/', eventController.createEvent)
route.get('/', eventController.getAllEvents)
route.get('/:id', eventController.getSingleEvent)
route.patch('/:id', eventController.updateEvent)
route.delete('/:id', eventController.deleteEvent)

export const EventRoutes = route
