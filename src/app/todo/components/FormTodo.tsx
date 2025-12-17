"use client";

import { createTodo } from "@/app/todo/actions/todo.actions";
import FormButton from "@/app/todo/components/FormButton";
import { TodoZodSchema } from "@/app/todo/schema/todo.zod.schema";
import { useRef } from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    try {
      TodoZodSchema.parse({ title });

      const backendResponse = await createTodo(title);

      if (!backendResponse.success) {
        return toast.error(backendResponse.message);
      }

      toast.success(backendResponse.message);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      }
    } finally {
      formRef.current?.reset();
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
        className="border rounded border-gray-400 p-2 flex-1 w-full"
      />
      <FormButton />
    </form>
  );
};

export default FormTodo;
