import { useTodoViewModel } from "../hooks/useTodoViewModel";
import { TodoHeader } from "../components/TodoHeader";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";

export const TodoPage: React.FC = () => {
  const { todos, loading, error, addNewTodo, isAdding } = useTodoViewModel();

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center pt-16 pb-12 px-4 sm:px-6 relative overflow-hidden font-sans selection:bg-violet-200 selection:text-violet-900">
      
      <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-violet-500/40 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute top-[10%] right-[-10%] w-100 h-100 bg-cyan-500/40 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-2xl bg-white rounded-4xl shadow-2xl shadow-slate-400/40 ring-1 ring-slate-200 overflow-hidden h-fit flex flex-col relative z-10">
        <TodoHeader />

        <div className="p-8 sm:p-12 pt-6">
          <TodoInput onAdd={addNewTodo} isAdding={isAdding} />
          <TodoList todos={todos} loading={loading} error={error} />
        </div>
      </div>
      
    </div>
  );
};