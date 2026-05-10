import type { Todo } from "../entities/Todo";

export interface TodoRepository {
    getTodos(): Promise<Todo[]>;
    addTodo(todo: string, userId: number): Promise<Todo>;
    updateTodo(id: number, updates: {completed?: boolean; todo?: string}): Promise<Todo>;
    deleteTodo(id: number): Promise<boolean>;
}