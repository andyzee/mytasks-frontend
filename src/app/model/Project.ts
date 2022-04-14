import { Validators } from "@angular/forms";
import { Type } from "class-transformer";
import { FCField } from "../util/decorators";
import { Todo } from "./Todo";

export class Project {
  @FCField()
  id: number = -1;

  @FCField([Validators.required, Validators.minLength(3)])
  title: string = '';

  @Type(() => Todo)
  todos: Todo[] = [];
}
