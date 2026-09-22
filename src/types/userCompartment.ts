import z from "zod";
import { userItemSchema } from "./userItem";

export const userCompartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  parentID: z.number(),
  items:z.array(userItemSchema)
});

export type userCompartment = z.infer<typeof userCompartmentSchema>;

