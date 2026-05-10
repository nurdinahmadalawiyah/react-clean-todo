import type { Todo } from "../../domain/entities/Todo";
import { TodoItem } from "./TodoItem";
import { Spinner } from "../../../../core/components/ui/Spinner";
import { Alert } from "../../../../core/components/ui/Alert";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: number, currentStatus: boolean) => void;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onToggle,
  onEdit,
  onDelete,
}) => {
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
        <p className="text-slate-400 text-lg">
          Belum ada tugas. Silakan tambahkan tugas baru!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
