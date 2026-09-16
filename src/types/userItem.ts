import z from "zod";

export const userItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number(),
});

export type UserItem = z.infer<typeof userItemSchema>;
