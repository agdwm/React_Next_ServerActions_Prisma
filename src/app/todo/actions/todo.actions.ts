"use server";

import { TodoZodSchema } from "@/app/todo/schema/todo.zod.schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  try {
    // Backend validation with Zod
    const validation = TodoZodSchema.safeParse({ title });
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }

    await prisma.todo.create({
      data: { title },
    });

    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating todo",
    };
  }
};

export const deleteTodo = async (id: string): Promise<TodoResponse> => {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "ID is required",
      };
    }

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error deleting todo",
    };
  }
};
