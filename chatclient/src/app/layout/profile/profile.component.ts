import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  submitted = false;
  image: String;
  selectedFile: File;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],      
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      city: [''],
      state: [''],
    });

    this.userService.getUser()
      .subscribe(
        data => {
          this.editProfileForm.patchValue(data.data);
          this.image = data.data.imageurl;
        },
        error => {
          this.toastr.error(error);
        });
  }
  get editForm() {
    return this.editProfileForm.controls;
  }
  edit() {
    this.submitted = true;
    if (this.editProfileForm.invalid)
      return;
    const userData = this.editProfileForm.value;

    this.userService.edit(userData)
      .subscribe(
        data => {
          this.toastr.success('Profile Updated');
          this.router.navigate(['/profile']);
        },
        error => {
          this.toastr.error(error);
        });

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.userService.uploadImage(this.selectedFile)
      .subscribe(
        error => {
          this.toastr.error(error);
        });
  }

}
