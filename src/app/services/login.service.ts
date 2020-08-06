import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// RxJS
import { map } from 'rxjs/operators';
// Config
import { SERVICE_LINK } from '../config/config';
// Model
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userDataSubject: BehaviorSubject<User>;
  public userData: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userDataSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.userData = this.userDataSubject.asObservable();
  }

  public get userValue(): User {
    return this.userDataSubject.value;
  }

  /**
   * Login in drupal
   * @param user credential to login
   */
  login(user: User) {
    const URL = `${ SERVICE_LINK }/user/login?_format=json`;

    return this.http.post(URL, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((res: any) => {
          const userData: User = {
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
