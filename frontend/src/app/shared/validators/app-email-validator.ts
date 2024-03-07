//тази функция се грижи за това да прилага регекса и да го валидира

import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|'); // ['bg', 'com'] => bg|com
  const regExp = new RegExp(`[^@]{4,}@[^@]{3,}\.(${domainStrings})$`);

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
