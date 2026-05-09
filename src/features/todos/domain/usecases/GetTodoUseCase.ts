import type { Todo } from "../entities/Todo";
import type { TodoRepository } from "../repositories/TodoRepository";

export class GetTodosUseCase {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async execute(): Promise<Todo[]> {
        return this.repository.getTodos()
    }
}