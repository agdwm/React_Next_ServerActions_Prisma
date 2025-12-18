"use server";

import { TodoZodSchema } from "@/app/todo/schema/todo.zod.schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  // Use `auth()` to access `isAuthenticated` - if false, the user is not signed in
  const { isAuthenticated } = await auth();

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return {
      success: false,
      message: "Sign in to view this page",
    };
  }

  // Get the Backend User object when you need access to the user's information
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return {
      success: false,
      message: "User ID not found",
    };
  }

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
      data: { title, userId: userId },
    });

    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created successfully",
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      success: false,
      message: "Error creating todo",
    };
  }
};

export const deleteTodo = async (id: string): Promise<TodoResponse> => {
  // Verify user is authenticated
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return {
      success: false,
      message: "Sign in to delete todos",
    };
  }

  // Get user ID
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return {
      success: false,
      message: "User ID not found",
    };
  }

  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "ID is required",
      };
    }

    // Delete only if the todo belongs to the authenticated user
    await prisma.todo.delete({
      where: { id, userId },
    });

    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      message: "Error deleting todo",
    };
  }
};
