// Core
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// Models
import { User } from './../../models/user.model';
// Services
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

    if (this.loginService) {
      this.router.navigateByUrl('/tasks');
    }
  }

  /**
   * Get user data from login
   * @param userForm user credentials
   */
  login(userForm: NgForm) {

    if (userForm.form.invalid) {
      return;
    }

    const user = new User(
      userForm.form.value.username,
      userForm.form.value.password
    );

    this.loginService.login(user)
      .subscribe(() => this.router.navigateByUrl('/tasks'));
  }
}
