import ItemTodo from "@/app/todo/components/ItemTodo";
import { TodoInterface } from "@/app/todo/interfaces/todo.interface";

interface ListTodoProps {
  todos: TodoInterface[];
}

const ListTodo = ({ todos }: ListTodoProps) => {
  if (!todos || todos.length === 0) {
    return <p className="text-center">No todos available.</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <ItemTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ListTodo;
