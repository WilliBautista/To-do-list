import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
// Interfaces
import { Task } from './../../interfaces/tasks.interface';
// Services
import { TasksService } from './../../services/tasks.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
// Model
import { UserInfo } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]>;
  dateNow: number = Date.now();
  countOwnTasks = 0;

  constructor(
    private tasksServices: TasksService,
    private loginService: LoginService,
    private userLogin: UserService
  ) {}

  ngOnInit() {
    const newArr: Task[] = [];

    this.tasksServices.getTasks(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken
      ).pipe(
        flatMap((tasks: Task[]) => tasks),
        map((task: Task, index: number) => {
          this.userLogin.getUser(
            this.loginService.userValue.authtoken,
            this.loginService.userValue.csrfToken,
            task.responsable_id
          ).pipe(
            map(res => {
              task.responsable = res;
              return res;
            })
          ).subscribe((res: UserInfo) => {
            newArr[index] = task;

            if (this.loginService.userValue.id == res.id && task.status === '1') {
              this.countOwnTasks++;
            }
          });

          return task;
        })
      ).subscribe(() => {
        this.tasksSubject.next(newArr);
        this.tasks$ = this.tasksSubject.asObservable();
      });
  }
}
