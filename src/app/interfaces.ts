export interface Project {
  id?: number;
  title: string;
  todos: Todo[];
}

export interface Todo {
  id?: number;
  text: string;
  isCompleted: boolean;
}
