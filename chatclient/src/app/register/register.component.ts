import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../validations/password.validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
        validator: MustMatch('password', 'repeatPassword')
      });
  }
  get regForm() {
    return this.registerForm.controls;
  }
  register() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;
    const userData = this.registerForm.value;
    console.log(userData);
    userData['userType'] = 1;
    this.userService.register(userData)
      .subscribe(
        data => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error(error);
        });
  }
}
