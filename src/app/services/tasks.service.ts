// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// Config
import { SERVICE_LINK } from './../config/config';
// Interface
import { NewTask, Task } from './../interfaces/tasks.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get only specific task
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   * @param idTask task id
   */
  getTask(authToken: string, csrfToken: string, idTask: string) {
    const url = `${ SERVICE_LINK }/rest/tasks/${ idTask }`;

    return this.http.get(url, {
          headers: {
            Authorization: authToken,
            'X-CSRF-Token': csrfToken,
          },
        }
      ).pipe(map((task: Task) => task[0]));
  }

  /**
   * Get all tasks
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   */
  getTasks(authToken: string, csrfToken: string) {
    const url = `${ SERVICE_LINK }/rest/tasks`;

    return this.http.get(url, {
          headers: {
            Authorization: authToken,
            'X-CSRF-Token': csrfToken,
          },
        }
      );
  }

  /**
   * Create task
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   * @param task json with the task data
   */
  createTask(authToken: string, csrfToken: string, task: NewTask) {
    const url = `${ SERVICE_LINK }/node?_format=hal_json`;
    task.finish_time = moment(task.finish_time, 'Y-m-d\TH:i:sP').format();

    // Create json structure for drupal
    const newsTask = {
      _links : {type: { href: `${ SERVICE_LINK }/rest/type/node/tasks` }},
      type : [{ target_id: 'tasks' }],
      title: [{ value: task.title }],
      body: [{ value: task.description }],
      field_estimated_time: [{ value: task.finish_time }],
      field_responsable: [{ target_id: task.responsable.id }]
    };


    // Send request
    return this.http.post(url, JSON.stringify(newsTask), {
        headers: {
          Authorization: authToken,
          'X-CSRF-Token': csrfToken,
          'Content-type': 'application/hal+json',
        }
      });
  }

  /**
   * Update task
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   * @param task json with the task data
   */
  updateTask(authToken: string, csrfToken: string, task: NewTask) {
    const url = `${ SERVICE_LINK }/node/${task.id}?_format=hal_json`;
    task.finish_time = moment(new Date(task.finish_time), 'Y-m-d\TH:i:sP').format();

    // Create json structure for drupal
    const newsTask = {
      _links: {type: { href: `${ SERVICE_LINK }/rest/type/node/tasks` }},
      nid: [{ value: task.id }],
      type: [{ target_id: 'tasks' }],
      title: [{ value: task.title }],
      body: [{ value: task.description }],
      field_estimated_time: [{ value: task.finish_time }],
      field_responsable: [{ target_id: task.responsable.id }],
      status: [{value: task.status}] || '1',
    };

    // Send request
    return this.http.patch(url, JSON.stringify(newsTask), {
        headers: {
          Authorization: authToken,
          'X-CSRF-Token': csrfToken,
          'Content-type': 'application/hal+json',
        }
      });
  }

  /**
   * Delete task
   * @param authToken Basic autorization token
   * @param csrfToken Drupal security token
   * @param id task id to delete
   */
  deleteTask(authToken: string, csrfToken: string, id: string) {
    const url = `${ SERVICE_LINK }/node/${ id }`;

    return this.http.delete(url, {
        headers: {
          Authorization: authToken,
          'X-CSRF-Token': csrfToken
        }
      });
  }
}
