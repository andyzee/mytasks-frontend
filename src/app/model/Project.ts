import { ValidatorFn, Validators } from "@angular/forms";
import { Expose, Type } from "class-transformer";
import { CTValidate } from "../util/decorators";
import { Model } from "./Model";
import { Todo } from "./Todo";

export class Project implements Model {
  static fields = [
    'id',
    'title'
  ]

  id: number = -1;

  @CTValidate([Validators.required, Validators.minLength(3)])
  @Expose()
  title: string = '';

  @Type(() => Todo)
  todos: Todo[] = [];
}
