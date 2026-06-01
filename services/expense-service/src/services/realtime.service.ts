export const emitRealtimeEvent =
    async (
        endpoint: string,
        body: any
    ) => {
        try {
            await fetch(
                `http://realtime-service:5000${endpoint}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        body
                    ),
                }
            );
        } catch (error) {
            console.error(
                "Realtime emit error",
                error
            );
        }
    };