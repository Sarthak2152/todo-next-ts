import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  completed: z.boolean().default(false),
  deadline: z.date(),
  id: z.string().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
