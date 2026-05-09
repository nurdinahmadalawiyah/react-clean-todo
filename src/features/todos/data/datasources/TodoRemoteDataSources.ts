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
}