import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MustMatch} from '../helpers/mustmatch.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

 constructor(private formBuilder: FormBuilder, private router: Router) { }

 get f() {
  return this.registerForm.controls;
}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      number : ['', Validators.required],
      password : ['', [Validators.required,  Validators.minLength(6)]],
      confirmPassword : ['', Validators.required]
    },  {
      Validators: MustMatch('password', 'confirmPassword')

    });
 }

 onSubmit() {
   this.submitted = true;
    // console.log('value entered');

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  } else {
    alert('SUCCESS');
    this.router.navigate(['/']);
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }
}


}


