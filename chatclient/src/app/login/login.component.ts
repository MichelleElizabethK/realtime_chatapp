import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get logForm() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;
    const userData = this.loginForm.value;
    userData['userType'] = 1;
    this.userService.login(userData)
      .subscribe(
        data => {
          localStorage.setItem('isLoggedin', 'true');
          console.info(data, "data");
          const refreshToken = data.data.refreshToken;
          localStorage.setItem("refreshToken", refreshToken);
          const accessToken = data.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          this.toastr.success('Login successful');
          this.router.navigate(['/chat']);
        },
        error => {
          this.toastr.error(error);
        });
  }
}
