import { Observable } from 'rxjs';
// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// Config
import { SERVICE_LINK } from '../config/config';
import { UserInfo } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get all users or responsables
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   */
  getUsers(authToken: string, csrfToken: string) {
    const url = `${ SERVICE_LINK }/rest/users`;

    return this.http.get(url, {
        headers: {
          Authorization: authToken,
          'x-csrf-token': csrfToken
        }
      });
  }

  /**
   * Get a single user
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   * @param id userid
   */
  getUser(authToken: string , csrfToken: string, id: string): Observable<UserInfo> {
    const url = `${SERVICE_LINK}/user/${id}?_format=json`;

    return this.http.get(url, {
        headers: {
          Authorization: authToken,
          'x-csrf-token': csrfToken
        }
      }).pipe(
        map((user: any): UserInfo => ({
          id: user.uid[0].value,
          name: user.name[0].value,
          mail: user.mail[0].value,
          roles: user.roles,
          avatarUrl: user.user_picture[0] !== undefined ? user.user_picture[0].url : false,
        }))
      );
  }
}
