import { Observable, BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
// Core
import { Component, Input, OnInit } from '@angular/core';
// Services
import { UserService } from 'src/app/services/user.service';
// Models/Interfaces
import { UserInfo } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userAuth: UserInfo;

  @Input() title: string;
  @Input() description: string;
  @Input() showProfile = true;

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userService.getUser(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken,
        this.loginService.userValue.id
      ).subscribe((user: UserInfo) => {
        this.userAuth = user;
      });
  }
}
