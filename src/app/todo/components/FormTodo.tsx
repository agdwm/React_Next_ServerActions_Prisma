"use client";

import { createTodo } from "@/app/todo/actions/todo.actions";
import FormButton from "@/app/todo/components/FormButton";
import { useRef } from "react";
import toast from "react-hot-toast";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    const response = await createTodo(title);

    if (response?.error) {
      toast.error(response.error);
      return;
    }
    if (response?.success) {
      toast.success("Todo created successfully");
    }

    formRef.current?.reset();
  };

  return (
    <form action={handleSubmit} className="mb-4 flex justify-center">
      <input
        type="text"
        name="title"
        id="title"
        className="border rounded border-gray-400 p-2 mr-2 flex-1"
      />
      <FormButton />
    </form>
  );
};

export default FormTodo;
