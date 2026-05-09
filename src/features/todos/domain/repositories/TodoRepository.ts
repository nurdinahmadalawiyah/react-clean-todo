import type { Todo } from "../entities/Todo";

export interface TodoRepository {
    getTodos(): Promise<Todo[]>;
    addTodo(todo: string, userId: number): Promise<Todo>;
}