import { Router } from "express";

import {
    activityCreated,
    balanceUpdated,
    expenseCreated,
    invitationAccepted,
    invitationRejected,
    memberInvited,
    memberJoined,
    notificationCreated,
    settlementCreated,
} from "../controllers/event.controller.js";

console.log("Event routes loaded");

const router = Router();

router.post(
    "/expense-created",
    expenseCreated
);

router.get("/ping", (_, res) => {
    res.json({
        pong: true,
    });
});

router.post(
    "/settlement-created",
    settlementCreated
);

router.post(
    "/balance-updated",
    balanceUpdated
);

router.post(
    "/member-invited",
    memberInvited
);

router.post(
    "/invitation-accepted",
    invitationAccepted
);

router.post(
    "/invitation-rejected",
    invitationRejected
);

router.post(
    "/member-joined",
    memberJoined
);

router.post(
    "/activity-created",
    activityCreated
);

router.post(
    "/notification-created",
    notificationCreated
);

export default router;