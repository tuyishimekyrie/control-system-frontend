import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("New password is required"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
