import type { Todo } from "../../domain/entities/Todo";
import { Checkbox } from "../../../../core/components/ui/Checkbox";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li className="group flex items-center gap-4 p-4 mb-3 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 cursor-pointer">
      
      <Checkbox checked={todo.completed} readOnly />

      <span
        className={`text-[1.05rem] transition-all duration-300 ${
          todo.completed 
            ? "line-through text-slate-400" 
            : "text-slate-700 font-medium"
        }`}
      >
        {todo.todo}
      </span>
    </li>
  );
};