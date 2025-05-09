import { Router } from "express";
import { participantController } from "./participant.controller";
import { auth } from "../../middlewares/Auth";
import { Role } from "@prisma/client";

const route = Router()

route.post('/:eventId/join', auth(Role.USER), participantController.createParticipant)
route.get("/:eventId/participants", auth(Role.USER, Role.ADMIN), participantController.participants)

export const ParticipantRoutes = route