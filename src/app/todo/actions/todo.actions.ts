"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTodo = async (title: string) => {
  if (!title || !title.trim()) {
    return {
      error: "Title is required (backend validation)",
    };
  }

  try {
    await prisma.todo.create({
      data: {
        title,
      },
    });
    // Synchronize the page after creating a new todo
    revalidatePath("/todo");
    return { success: true };
  } catch (error) {
    return {
      error: "Error on creating todo (backend validation)",
    };
  }
};
