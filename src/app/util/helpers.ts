import { FormControl, FormGroup } from "@angular/forms";
import { Model } from "../model/Model";
import { Todo } from "../model/Todo";

type FGConfigType = {
  [key: string]: FormControl;
}

type WFields = {
  fields: string[]
}

export function CTCreateFormGroup(target: Model): FormGroup {

  const fgConfig: FGConfigType = {};
  // target.constructor.fields is guaranteed (is static prop of Model class and is overriden in children)
  const reflection = target.constructor as unknown as WFields;
  reflection.fields.forEach((prop: string) => {
    const metadata = Reflect.getMetadata(`validators_${prop}`, target.constructor);
    const validators = metadata ? metadata : []
    const control = new FormControl(target[prop] as any, validators)
    fgConfig[prop] = control;
  });

  const grp = new FormGroup(fgConfig)

  return grp;
}
