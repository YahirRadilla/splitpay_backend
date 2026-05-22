import { Notification } from "../models/notification.model.js";

export const createNotification =
    async (
        userId: string,
        type: string,
        title: string,
        message: string,
        metadata: any = {}
    ) => {
        return Notification.create({
            userId,
            type,
            title,
            message,
            metadata,
        });
    };

export const getMyNotifications =
    async (userId: string) => {
        return Notification.find({
            userId,
        }).sort({
            createdAt: -1,
        });
    };

export const markAsRead =
    async (
        notificationId: string,
        userId: string
    ) => {
        const notification =
            await Notification.findOne({
                _id: notificationId,
                userId,
            });

        if (!notification) {
            throw new Error(
                "Notification not found"
            );
        }

        notification.read = true;

        await notification.save();

        return notification;
    };