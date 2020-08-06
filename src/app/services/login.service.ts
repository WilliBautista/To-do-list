import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// RxJS
import { map } from 'rxjs/operators';
// Config
import { SERVICE_LINK } from '../config/config';
// Mode
import { UserAuth } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userDataSubject: BehaviorSubject<UserAuth>;
  public userData: Observable<UserAuth>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userDataSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('user')));
    this.userData = this.userDataSubject.asObservable();
  }

  public get userValue(): UserAuth {
    return this.userDataSubject.value;
  }

  /**
   * Login in drupal
   * @param user credential to login
   */
  login(user: UserAuth) {
    const URL = `${ SERVICE_LINK }/user/login?_format=json`;

    return this.http.post(URL, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((res: any) => {
          const userData: UserAuth = {
            id: res.current_user.uid,
            name: res.current_user.name,
            authtoken: 'Basic ' + btoa(`${user.name}:${user.pass}`),
            logoutToken: res.logout_token,
            csrfToken: res.csrf_token,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          this.userDataSubject.next(userData);

          return res;
        })
      );
  }

  /**
   * Clean user information
   * Close session
   */
  logout() {
    localStorage.removeItem('user');

    this.userDataSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
