import { z } from "zod";

export const blockschema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().min(5, "Invalid URL format"),
});
