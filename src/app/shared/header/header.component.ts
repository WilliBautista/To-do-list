// Core
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
// Services
import { LoginService } from 'src/app/services/login.service';
// Models/Interfaces
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  avatar: any;
  title: string;
  description: string;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((event: ActivationEnd) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
        map(data => data.snapshot )
      ).subscribe(({ data }) => {
          this.title = data.title;
          this.description = data.description;
        });
  }

  ngOnInit() {
    this.userService.getUser(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken,
        this.loginService.userValue.id
      ).pipe(
        map((res: UserInfo) => {
          const { avatarUrl, mail, name } = res;
          return {
            avatarUrl,
            mail,
            name
          };
        })
      ).subscribe(res => {
        this.avatar = res;
      });
  }

  logout() {
    this.loginService.logout();
  }
}
