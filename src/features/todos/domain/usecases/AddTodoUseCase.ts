import type { Todo } from "../entities/Todo";
import type { TodoRepository } from "../repositories/TodoRepository";

export class AddTodoUseCase {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async execute(todo: string, userId: number): Promise<Todo> {
        if (!todo.trim()) {
            throw new Error("Tugas tidak boleh kosong");
        }
        return await this.repository.addTodo(todo, userId);
    }
}