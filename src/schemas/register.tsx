import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Please provide an email address" })
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string({ required_error: "Please provide a password" })
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(30, { message: "Password cannot be more than 30 characters long" }),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
