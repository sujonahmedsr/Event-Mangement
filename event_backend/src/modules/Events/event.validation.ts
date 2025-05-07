import { z } from "zod";

// Optional: If you have an enum in Prisma called EventType
const eventTypeEnum = z.enum(["PUBLIC_FREE",
    "PUBLIC_PAID",
    "PRIVATE_FREE",
    "PRIVATE_PAID"]); // Replace with your actual enum values

export const createEventZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }),
        description: z.string({ required_error: "Description is required" }),
        dateTime: z.string({ required_error: "DateTime is required" }).refine(
            val => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }
        ),
        location: z.string({ required_error: "Location is required" }),
        fee: z.number().min(0, { message: "Fee must be zero or positive" }).default(0),
        isPaid: z.boolean({ required_error: "isPaid is required" }),
        isPrivate: z.boolean({ required_error: "isPrivate is required" }),
        type: eventTypeEnum,
        creatorId: z.string({ required_error: "CreatorId is required" }),
    })
});

export const updateEventZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dateTime: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }).optional(),
        location: z.string().optional(),
        fee: z.number().min(0).optional(),
        isPaid: z.boolean().optional(),
        isPrivate: z.boolean().optional(),
        type: eventTypeEnum.optional(),
        creatorId: z.string().optional(),
    })
});

