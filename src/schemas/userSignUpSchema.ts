import { z } from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
export const userSignUpSchema = z.object({
  firstName: z
    .string()
    .min(4, "First name must be more than 4 characters")
    .max(30, "First name must be more than 30 characters"),
  lastName: z
    .string()
    .min(4, "Last name must be more than 4 characters")
    .max(30, "Last name must be more than 30 characters"),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters long and contain at least one letter and one number."
    ),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;
