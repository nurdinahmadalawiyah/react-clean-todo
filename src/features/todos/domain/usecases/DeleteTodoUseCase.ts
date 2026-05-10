import type { TodoRepository } from "../repositories/TodoRepository";

export class DeleteTodoUseCase {
    private repository: TodoRepository;

    constructor(repository: TodoRepository) {
        this.repository = repository;
    }

    async execute(id: number): Promise<boolean> {
        if (id <= 0) throw new Error("ID tugas tidak valid");
        return await this.repository.deleteTodo(id);
    }
}