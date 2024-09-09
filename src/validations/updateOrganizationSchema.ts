import { z } from "zod";

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name cannot exceed 100 characters"),
  maxUsers: z
    .string()
    .transform((value) => {
      const parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        throw new Error("Max devices must be a number");
      }
      return parsedValue;
    })
    .refine((val) => val >= 0, {
      message: "Maximum users must be 0 or greater",
    }),
});