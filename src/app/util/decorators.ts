// add native validators in array to model for CTCreateFormGroup

import { ValidatorFn } from "@angular/forms";

export function FCField(validators: ValidatorFn[] = []) {
  return function (target: Object, propertyKey: string) {
    Reflect.defineMetadata(`fcfield_${propertyKey}`, validators, target.constructor);
  }
}
