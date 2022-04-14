// add native validators in array to model for CTCreateFormGroup

export function FCField(validators: Function[] = []) {
  return function (target: Object, propertyKey: string) {
    Reflect.defineMetadata(`fcfield_${propertyKey}`, validators, target.constructor);
  }
}
