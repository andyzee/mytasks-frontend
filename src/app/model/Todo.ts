import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { CTValidate } from "../util/decorators";
import { Model } from "./Model";

export function requiredIf(prop: string, value: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent)
      return null

    const propDependentOn = <AbstractControl>control.parent.get(prop);
    return propDependentOn.value == value ? Validators.required(control) : null
  };
}

export class Todo implements Model {
  static fields = [
    'text',
    'isCompleted',
    'project_id',
    'project_title'
  ];

  id?: number;

  @CTValidate([Validators.required, Validators.minLength(3)])
  text!: string;

  isCompleted: boolean = false;

  @CTValidate([Validators.required])
  project_id!: number;

  @CTValidate([requiredIf('project_id', -1), Validators.minLength(3)])
  project_title?: string;
}
