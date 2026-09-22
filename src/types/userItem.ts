import z from "zod";

export const userItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  parentID: z.number(),
  amount: z.number(),
});

export type UserItem = z.infer<typeof userItemSchema>;
