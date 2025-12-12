import { prisma } from "@/lib/prisma";
const Todo = async () => {
  const todos = await prisma.todo.findMany();

  return (
    <div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
};
export default Todo;
