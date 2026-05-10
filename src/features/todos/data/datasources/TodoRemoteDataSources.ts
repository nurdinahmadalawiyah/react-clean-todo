import { apiClient } from "../../../../core/api";
import type { Todo } from "../../domain/entities/Todo";

interface DummyJsonTodoResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}

export class TodoRemoteDataSources {
    async fetchTodos(): Promise<Todo[]> {
        const response = await apiClient.get<DummyJsonTodoResponse>('/todos?limit=5');
        return response.data.todos
    }

    async createTodo(todotext: string, userId: number): Promise<Todo> {
        const response = await apiClient.post<Todo>('/todos/add', {
            todo: todotext,
            completed: false,
            userId: userId
        });
        return response.data
    }

    async updateTodo(id: number, updates: { completed?: boolean; todo?: string }): Promise<Todo> {
        const response = await apiClient.put<Todo>(`/todos/${id}`, updates);
        return response.data
    }

    async deleteTodo(id: number): Promise<boolean> {
        const response = await apiClient.delete(`/todos/${id}`);
        return response.data?.isDeleted === true || response.status === 200;
    }
}