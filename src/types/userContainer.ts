import z from "zod";
import { userCompartmentSchema } from "./userCompartment";

export const userContainerSchema = z.object({
  id: z.number(),
  name: z.string(),
  compartments: z.array(userCompartmentSchema)
});

export type UserContainer = z.infer<typeof userContainerSchema>;
