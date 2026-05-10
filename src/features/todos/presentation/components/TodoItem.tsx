import type { Todo } from "../../domain/entities/Todo";
import { Checkbox } from "../../../../core/components/ui/Checkbox";
import { useEffect, useRef, useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.todo) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.todo);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(todo.todo);
      setIsEditing(false);
    }
  };

  return (
    <li
      onClick={() => onToggle(todo.id, todo.completed)}
      className="group flex items-center gap-4 p-4 mb-3 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
        />

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave} // Simpan jika user klik di luar kotak
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-1.5 text-[1.05rem] text-slate-800 bg-slate-50 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        ) : (
          <span
            onClick={() => onToggle(todo.id, todo.completed)}
            className={`text-[1.05rem] transition-all duration-300 ${todo.completed ? "line-through text-slate-400" : "text-slate-800 font-medium"}`}
          >
            {todo.todo}
          </span>
        )}
      </div>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
        {!isEditing && (
          <button
            onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                }}
            className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-90"
            title="Edit tugas"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
          title="Hapus tugas"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
