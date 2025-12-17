"use server";

import { TodoZodSchema } from "@/app/todo/schema/todo.zod.schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { success, ZodError } from "zod";

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  // Backedn validation
  try {
    TodoZodSchema.parse({ title });

    await prisma.todo.create({
      data: {
        title,
      },
    });
    // Synchronize the page after creating a new todo
    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created successfully (backend)",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    return {
      success: false,
      message: "Error on creating todo (backend)",
    };
  }
};

export const deleteTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return {
      error: "ID is required (backend validation)",
    };
  }

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/todo");
    return { success: true };
  } catch (error) {
    return {
      error: "Error on deleting todo (backend validation)",
    };
  }
};
