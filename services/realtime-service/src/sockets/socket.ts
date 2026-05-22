import { Server, Socket } from "socket.io";

export const registerSockets =
    (io: Server) => {
        io.on(
            "connection",
            (socket: Socket) => {
                console.log(
                    `Connected ${socket.id}`
                );

                socket.on(
                    "join-user",
                    (
                        userId: string
                    ) => {
                        socket.join(
                            userId
                        );

                        console.log(
                            `${socket.id} joined user room ${userId}`
                        );
                    }
                );

                socket.on(
                    "join-group",
                    (
                        groupId: string
                    ) => {
                        socket.join(
                            groupId
                        );

                        console.log(
                            `${socket.id} joined group ${groupId}`
                        );
                    }
                );

                socket.on(
                    "disconnect",
                    () => {
                        console.log(
                            `Disconnected ${socket.id}`
                        );
                    }
                );
            }
        );
    };