import { z } from "zod";

export const createExpenseSchema =
    z.object({
        groupId: z.string().min(1),

        description: z
            .string()
            .min(1)
            .max(100),

        amount: z.number().positive(),
    });