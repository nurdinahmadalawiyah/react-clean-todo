import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../../domain/entities/Todo";
import { TodoRemoteDataSources } from "../../data/datasources/TodoRemoteDataSources";
import { TodoRepositoryImpl } from "../../data/repositories/TodoRepositoryImpl";
import { AddTodoUseCase } from "../../domain/usecases/AddTodoUseCase";
import { GetTodosUseCase } from "../../domain/usecases/GetTodoUseCase";
import { UpdateTodoUseCase } from "../../domain/usecases/UpdateTodoUseCase";
import { DeleteTodoUseCase } from "../../domain/usecases/DeleteTodoUseCase";

const dataSource = new TodoRemoteDataSources();
const repository = new TodoRepositoryImpl(dataSource);
const getTodosUseCase = new GetTodosUseCase(repository);
const addTodoUseCase = new AddTodoUseCase(repository);
const updateTodoUseCase = new UpdateTodoUseCase(repository);
const deleteTodoUseCase = new DeleteTodoUseCase(repository);

export const useTodoViewModel = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = useCallback(async () => {
        try {
            const data = await getTodosUseCase.execute();
            setTodos(data);
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Gagal memuat data dari server");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const addNewTodo = async (todoText: string) => {
        setIsAdding(true);
        try {
            const newTodo = await addTodoUseCase.execute(todoText, 1);
            setTodos((prevTodos) => [newTodo, ...prevTodos]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Gagal menambahkan tugas baru");
            }
        } finally {
            setIsAdding(false);
        }
    };

    const toggleTodo = async (id: number, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: newStatus } : t));

        try {
            await updateTodoUseCase.execute(id, { completed: newStatus });
        } catch (error: unknown) {
            setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: !newStatus } : t));
            console.error("Gagal memperbarui tugas:", error);
        }
    }

    const editTodo = async (id: number, newText: string) => {
        if (!newText.trim()) return;

        const previousTodos = [...todos];
        setTodos((prev) => prev.map(t => t.id === id ? { ...t, todo: newText } : t));

        try {
            await updateTodoUseCase.execute(id, { todo: newText });
        } catch (error: unknown) {
            setTodos(previousTodos);
            console.error("Gagal memperbarui tugas:", error);
        }
    }

    const removeTodo = async (id: number) => {
        const previousTodos = [...todos];
        setTodos((prev) => prev.filter(t => t.id !== id));

        try {
            await deleteTodoUseCase.execute(id);
        } catch (error: unknown) {
            setTodos(previousTodos);
            console.error("Gagal menghapus tugas:", error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        isAdding,
        addNewTodo,
        toggleTodo,
        editTodo,
        removeTodo
    };
};