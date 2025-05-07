import { Router } from "express";
import { participantController } from "./participant.controller";
import { auth } from "../../middlewares/Auth";
import { Role } from "@prisma/client";

const route = Router()

route.post('/:eventId', auth(Role.USER), participantController.createParticipant)
route.get("/", participantController.getAllParticipants)
route.get("/:eventId", participantController.getSingleParticipant)
route.delete("/:eventId", participantController.deleteParticipant)

export const ParticipantRoutes = route