import type { Todo } from "../entities/Todo"
import type { TodoRepository } from "../repositories/TodoRepository"

export class UpdateTodoUseCase {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async execute(id: number, updates: { completed?: boolean; todo?: string }): Promise<Todo> {
        if (id <= 0) throw new Error("ID tugas tidak valid");
        if (updates.completed === undefined && updates.todo === undefined) throw new Error("Tidak ada perubahan pada data tugas");
        return await this.repository.updateTodo(id, updates)
    }
}