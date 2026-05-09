import type { Todo } from "../../domain/entities/Todo";
import { TodoItem } from "./TodoItem";
import { Spinner } from "../../../../core/components/ui/Spinner";
import { Alert } from "../../../../core/components/ui/Alert";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, loading, error }) => {
if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner /> 
      </div>
    );
  }
  if (error) return <Alert message={error} variant="error" />;
  
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Belum ada tugas. Silakan tambahkan tugas baru!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};