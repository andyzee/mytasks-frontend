import { Type } from "class-transformer";
import { Todo } from "./Todo";

export class Project {
  id: number = -1;
  title: string = '';
  @Type(() => Todo)
  todos: Todo[] = [];
}
