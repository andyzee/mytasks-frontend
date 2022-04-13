import { FormControl, FormGroup } from "@angular/forms";
import { Todo } from "../model/Todo";

type FGConfigType = {
  [key: string]: FormControl;
}

type WFields = {
  fields: string[]
}

export function CTCreateFormGroup(target: any): FormGroup {

  const fgConfig: FGConfigType = {};
  const reflection = target.constructor as WFields;
  reflection.fields.forEach((prop: string) => {
    const metadata = Reflect.getMetadata(`validators_${prop}`, target.constructor);
    const validators = metadata ? metadata : []
    const control = new FormControl(target[prop], validators)
    fgConfig[prop] = control;
  });

  const grp = new FormGroup(fgConfig)

  return grp;
}
