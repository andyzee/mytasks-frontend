import { FormControl, FormGroup } from "@angular/forms";

type FGConfigType = {
  [key: string]: FormControl;
}

export function CTCreateFormGroup(target: Object): FormGroup {
  const fgConfig: FGConfigType = {};

  let propName: keyof typeof target;
  for (propName in target) {
    const validators = Reflect.getMetadata(`fcfield_${propName}`, target.constructor);
    if (!validators) continue;
    const control = new FormControl(target[propName], validators);
    fgConfig[propName] = control;
  };

  const grp = new FormGroup(fgConfig);

  return grp;
}
