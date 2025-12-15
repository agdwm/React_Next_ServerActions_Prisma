import FormTodo from "@/app/todo/components/FormTodo";
import { prisma } from "@/lib/prisma";

// Server Component
const Todo = async () => {
  const todos = await prisma.todo.findMany();

  return (
    <div>
      <h1 className="text-center text-3xl my-10">Todo List</h1>
      <FormTodo />
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
};
export default Todo;
