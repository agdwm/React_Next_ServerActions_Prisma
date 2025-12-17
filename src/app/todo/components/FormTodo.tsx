"use client";

import { createTodo } from "@/app/todo/actions/todo.actions";
import FormButton from "@/app/todo/components/FormButton";
import { TodoZodSchema } from "@/app/todo/schema/todo.zod.schema";
import { useRef } from "react";
import toast from "react-hot-toast";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    try {
      // Frontend validation (redundant but helpful for UX)
      const validation = TodoZodSchema.safeParse({ title });
      if (!validation.success) {
        validation.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      const response = await createTodo(title);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      formRef.current?.reset();
    } catch (error) {
      toast.error("Unexpected error");
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex justify-between gap-3"
      ref={formRef}
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Add a new todo..."
        className="border rounded border-gray-400 p-2 flex-1 w-full"
      />
      <FormButton />
    </form>
  );
};

export default FormTodo;
