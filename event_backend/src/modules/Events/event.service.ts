import { Event } from "@prisma/client";
import prisma from "../../utils/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

// Create Event
const createEvent = async (payload: Event) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: payload.creatorId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Creator not found.");
  }

  const event = await prisma.event.create({
    data: payload,
  });

  return event;
};

// Get All Events
const getAllEvents = async () => {
  return await prisma.event.findMany({
    where: { isDeleted: false },
    orderBy: { dateTime: "asc" },
  });
};

// Get Single Event
const getSingleEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event || event.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
  }

  return event;
};

// Update Event
const updateEvent = async (id: string, data: Partial<Event>) => {
  const existingEvent = await prisma.event.findUnique({ where: { id } });

  if (!existingEvent || existingEvent.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data,
  });

  return updatedEvent;
};

// Soft Delete Event
const deleteEvent = async (id: string) => {
  const existingEvent = await prisma.event.findUnique({ where: { id } });

  if (!existingEvent || existingEvent.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
  }

  await prisma.event.update({
    where: { id },
    data: { isDeleted: true },
  });

  return { message: "Event soft deleted successfully" };
};

// Export All Services
export const eventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
