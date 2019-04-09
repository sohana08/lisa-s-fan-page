import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchName: string) {
  return(formGroup: FormGroup) =>  {
    const control = formGroup.controls[controlName];
    // const controls = control.get('password').value;
    const matchControl = formGroup.controls[matchName];

    if ( matchControl.errors && !matchControl.errors.MustMatch ) {
      return;
    }

    if (control.value !== matchControl.value ) {
      matchControl.setErrors({ MustMatch: true });

    } else {
      matchControl.setErrors(null);
    }
};

}
