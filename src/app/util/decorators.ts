// add native validators in array to model for CTCreateFormGroup

export function CTValidate(validators: any[]) {
  return function (target: Object, propertyKey: string) {
    const metadata = {
      propertyKey,
      validators,
    };
    Reflect.defineMetadata(`validators_${propertyKey}`, metadata, target.constructor);
  }
}
