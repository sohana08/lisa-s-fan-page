import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchName: string) {
  // const mustMatch = true;
  return(formGroup: FormGroup) =>  {
    const control = formGroup.controls[controlName];
    // const controls = control.get('password').value;
    const matchControl = formGroup.controls[matchName];

    if ( matchControl.errors && !matchControl.errors.mustMatch ) {
      return;
    }

    if (control.value !== matchControl.value ) {
      matchControl.setErrors({ mustMatch: false });

    } else {
      matchControl.setErrors(null);
    }
};

}
