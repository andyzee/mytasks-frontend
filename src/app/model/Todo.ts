import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FCField } from "../util/decorators";

export function requiredIf(prop: string, value: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent)
      return null

    const propDependentOn = <AbstractControl>control.parent.get(prop);
    return propDependentOn.value == value ? Validators.required(control) : null
  };
}

export class Todo {
  @FCField()
  id: number | null = null;

  @FCField([Validators.required, Validators.minLength(3)])
  text: string | null = null;

  @FCField()
  isCompleted: boolean = false;

  @FCField([Validators.required])
  project_id: number | null = null;

  @FCField([requiredIf('project_id', -1), Validators.minLength(3)])
  project_title: string | null = null;

}
