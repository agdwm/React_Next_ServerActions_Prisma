import FormTodo from "@/app/todo/components/FormTodo";
import ListTodo from "@/app/todo/components/ListTodo";
import { prisma } from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

// Server Component
const TodoPage = async () => {
  const user: User | null = await currentUser();

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl">Please sign in</h2>
      </div>
    );
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-center text-3xl my-10">Todo List: {user.username}</h1>
      <FormTodo />
      <ListTodo todos={todos} />
    </div>
  );
};
export default TodoPage;
