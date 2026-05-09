import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../../domain/entities/Todo";
import { TodoRemoteDataSources } from "../../data/datasources/TodoRemoteDataSources";
import { TodoRepositoryImpl } from "../../data/repositories/TodoRepositoryImpl";
import { AddTodoUseCase } from "../../domain/usecases/AddTodoUseCase";
import { GetTodosUseCase } from "../../domain/usecases/GetTodoUseCase";

const dataSource = new TodoRemoteDataSources();
const repository = new TodoRepositoryImpl(dataSource);
const getTodosUseCase = new GetTodosUseCase(repository);
const addTodoUseCase = new AddTodoUseCase(repository);

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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        addNewTodo,
        isAdding
    };
};