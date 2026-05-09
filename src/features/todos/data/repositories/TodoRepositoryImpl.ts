import type { Todo } from "../../domain/entities/Todo";
import type { TodoRepository } from "../../domain/repositories/TodoRepository";
import type { TodoRemoteDataSources } from "../datasources/TodoRemoteDataSources";

export class TodoRepositoryImpl implements TodoRepository {
    private remoteDataSource: TodoRemoteDataSources;

    constructor(remoteDataSource: TodoRemoteDataSources) {
        this.remoteDataSource = remoteDataSource;
    }

    async getTodos(): Promise<Todo[]> {
        return await this.remoteDataSource.fetchTodos()
    }

    async addTodo(todo: string, userId: number): Promise<Todo> {
        return await this.remoteDataSource.createTodo(todo, userId)
    }

}