import { Type } from "class-transformer";
import { Todo } from "./Todo";

export class Project {
  id: number = 0;
  title: string = '';

  @Type(() => Todo)
  todos: Todo[] = [];
}
