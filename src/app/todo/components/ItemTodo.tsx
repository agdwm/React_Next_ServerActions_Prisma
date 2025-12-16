"use client";

import { TodoInterface } from "@/app/todo/interfaces/todo.interface";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useTransition } from "react";
import { deleteTodo } from "@/app/todo/actions/todo.actions";
import toast from "react-hot-toast";

interface ItemTodoProps {
  todo: TodoInterface;
}

const ItemTodo = ({ todo }: ItemTodoProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClickRemove = async (id: string) => {
    console.log("Eliminar Todo con id:", todo.id);

    const response = await deleteTodo(id);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    if (response?.success) {
      toast.success("Todo removed successfully");
    }
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded p-2 mb-2  ">
      <p>{todo.title}</p>
      <button
        onClick={() =>
          startTransition(() => {
            handleClickRemove(todo.id);
          })
        }
        className="bg-red-500 rounded p-2 text-white cursor-pointer gap-2 flex items-center"
      >
        {isPending ? (
          <span>
            <FaSpinner className="transform animate-spin" />
          </span>
        ) : (
          <FaTrash />
        )}
      </button>
    </div>
  );
};

export default ItemTodo;
