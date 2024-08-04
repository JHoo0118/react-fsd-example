import { z } from "zod";

export const SessionSchema = z.object({
  email: z.string(),
  token: z.string(),
  username: z.string(),
});
