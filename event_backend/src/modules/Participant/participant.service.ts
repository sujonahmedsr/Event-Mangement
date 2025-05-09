import StatusCode from "http-status"
import ApiError from "../../errors/ApiError"
import prisma from "../../utils/prisma"
import { ApprovalStatus, EventStatus, PaymentStatus } from "@prisma/client";

const createParticipant = async (eventId: string, userId: string) => {
    const event = await prisma.event.findUnique({ where: { id: eventId, is_deleted: false } });
    if (!event) throw new ApiError(StatusCode.NOT_FOUND, "Event not found.");
    const participant = await prisma.participant.findUnique({
        where: { event_id_user_id: { event_id: eventId, user_id: userId } },
    });

    if (participant) {
        throw new ApiError(
            StatusCode.BAD_REQUEST,
            'You are already a participant',
        );
    }

    if (event.status === EventStatus.COMPLETED) {
        throw new ApiError(StatusCode.FORBIDDEN, 'Event is completed');
    }

    if (event.status === EventStatus.CANCELLED) {
        throw new ApiError(StatusCode.FORBIDDEN, 'Event is cancelled');
    }

    let result;

    if (!event.is_private && !event.is_paid) {
        // instant acceptance
        result = await prisma.participant.create({
            data: {
                event_id: eventId,
                user_id: userId,
                payment_status: PaymentStatus.FREE,
                approval_status: ApprovalStatus.APPROVED,
            },
        });
    } else if (event.is_private && event.is_paid) {
        // payment flow
        await prisma.payment.create({
            data: {
                event_id: eventId,
                user_id: userId,
                amount: event.fee,
                transaction_id: 'PaymentUtils.generateTransactionId()',
            },
        });
        result = await prisma.participant.create({
            data: {
                event_id: eventId,
                user_id: userId,
                payment_status: PaymentStatus.PENDING,
                approval_status: ApprovalStatus.PENDING,
            },
        });
    } else if (!event.is_private && event.is_paid) {
        // payment flow
        await prisma.payment.create({
            data: {
                event_id: eventId,
                user_id: userId,
                amount: event.fee,
                transaction_id: "PaymentUtils.generateTransactionId()",
            },
        });
        result = await prisma.participant.create({
            data: {
                event_id: eventId,
                user_id: userId,
                payment_status: PaymentStatus.PENDING,
                approval_status: ApprovalStatus.PENDING,
            },
        });
    } else if (event.is_private && !event.is_paid) {
        // pending approval
        result = await prisma.participant.create({
            data: {
                event_id: eventId,
                user_id: userId,
                payment_status: PaymentStatus.FREE,
                approval_status: ApprovalStatus.PENDING,
            },
        });
    }

    return result;
};


const participants = async (eventId: string) => {
    const result = await prisma.event.findMany({
        where: {
            id: eventId
        },
        include: {
            Participant: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    })
    return result
}



export const participantService = {
    createParticipant,
    participants
}