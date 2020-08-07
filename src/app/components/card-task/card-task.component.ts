import { Router } from '@angular/router';
import { TasksService } from './../../services/tasks.service';
import { LoginService } from './../../services/login.service';
import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/tasks.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {

  @Input() task: Task;
  @Input() detail = false;

  constructor(
    private loginService: LoginService,
    private tasksService: TasksService,
    private router: Router,
  ) {}

  timeLeft(time: string): string {
    const date = new Date(time);

    return `${ date.getHours() } hrs`;
  }

  /**
   * Convert in lower and remove spaces
   * @param text string to format as link
   */
  lowerText(text: string): string {
    return text.toLowerCase().replace(/\s/ig, '-');
  }

  addTime(id) {

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
