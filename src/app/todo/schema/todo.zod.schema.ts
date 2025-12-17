import { z } from "zod";

export const TodoZodSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty({ message: "Title is required (frontend validation)" })
    .max(100, { message: "Maximum 100 characters (frontend validation)" }),
});

export type Todo = z.infer<typeof TodoZodSchema>;
