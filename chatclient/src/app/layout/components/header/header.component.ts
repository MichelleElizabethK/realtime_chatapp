import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  public user: User;
  public name: string;
  constructor(
    public router: Router,
    public userService: UserService
  ) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }
  
  ngOnInit() {
    this.pushRightClass = 'push-right';

    this.userService.getUser()
      .subscribe(
        data => {
          this.name = data.data.firstName;
          this.user = data.data;
        });
  }
  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    this.userService.notOnline(this.user)
      .subscribe();
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
