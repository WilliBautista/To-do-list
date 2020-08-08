//  Core
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
// Servicios
import { TasksService } from './../../services/tasks.service';
import { LoginService } from './../../services/login.service';
// Interfaces
import { Task } from 'src/app/interfaces/tasks.interface';
// Third parties
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent implements OnInit {

  @Input() task: Task;
  @Input() detail: boolean;
  finishTime: string;

  constructor(
    private loginService: LoginService,
    private tasksService: TasksService,
    private router: Router,
  ) {
    this.detail = false;
  }

  ngOnInit() {
    if (this.task.status === '1') {
      this.intervalTime();
    }
  }

  /**
   * Unpublish task
   * @param task task to unpublish
   */
  unpublishTash(task: Task) {
    task.status = '0';
    this.tasksService.updateTask(
      this.loginService.userValue.authtoken,
      this.loginService.userValue.csrfToken,
      task
    ).subscribe(() => {
      this.task.status = '0';
    });
  }

  /**
   * Interval to control time left
   */
  intervalTime() {
    const inter: Observable<number> = interval(1000);
    inter.pipe(
      map((): moment.Duration => {
        const now = moment(new Date());
        const finishTime = moment(new Date(this.task.finish_time));
        const momentTime: moment.Duration = moment.duration(finishTime.diff(now));

        return momentTime;
      })
    ).subscribe(res => {
      const day = res.get('days');
      const hours = res.get('hours');
      const mins = res.get('minutes');
      const seconds = res.get('seconds');
      const hoursSimbol = hours === 1 ? 'hr' : 'hrs';
      const minsSimbol = mins === 1 ? 'min' : 'mins';
      let stringTime: string;

      if (day >= 1) {
        stringTime = `${ day } días ${ hours } ${ hoursSimbol }`;
      } else {
        if (hours > 1) {
          stringTime = `${ hours } ${ hoursSimbol } ${ mins } ${ minsSimbol }`;
        } else {
          if (mins > 1) {
            stringTime = `${ mins } ${ minsSimbol }`;
          } else {
            stringTime = `${ mins } ${ minsSimbol } ${ seconds } segundos`;

            if (mins === 0 && seconds === 0) {
              this.unpublishTash(this.task);
            }
          }
        }
      }

      this.finishTime = stringTime;
    });
  }

  /**
   * Convert in lower and remove spaces
   * @param text string to format as link
   */
  lowerText(text: string): string {
    return text.toLowerCase().replace(/\s/ig, '-');
  }

  /**
   * Delete specific task
   * @param id Task id
   */
  delete(title: string, id: string): void {
    this.tasksService.deleteTask(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken,
        id
      ).subscribe(() => {
        Swal.fire(`¡La tarea "${ title }" fue eliminada exitosamente!`, '', 'success')
          .then(() => {
            this.router.navigateByUrl('/tasks', { skipLocationChange: true })
                .then(() => this.router.navigate(['/']));
          });
      });
  }
}
