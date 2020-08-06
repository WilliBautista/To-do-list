// Core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
// Interfaces
import { NewTask } from 'src/app/interfaces/tasks.interface';
import { Responsable } from './../../interfaces/responsable.interface';
// Services
import { TasksService } from './../../services/tasks.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.scss']
})
export class CreateUpdateTaskComponent implements OnInit {

  minDate: Date;
  createTaskForm: FormGroup;
  responsables: Responsable[];
  filterResponsables: Observable<Responsable[]>;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.minDate = new Date();
    this.getResponsableUsers();
  }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      finish_time: ['', Validators.required],
      description: ['', Validators.required],
      responsable: ['', Validators.required]
    });
  }

  get f() {
    return this.createTaskForm.controls;
  }

  /**
   * Filter name
   * @param name value to search in Responsables array
   */
  private _filter(name: string): Responsable[] {
    const filterValue = name.toLowerCase();

    return this.responsables.filter(responsable => responsable.name.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Fill autocomplete with responsables
   */
  autocompleteFilter() {
    this.filterResponsables = this.f.responsable.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.responsables.slice())
      );
  }

  /**
   * Get responsables users for the autocomplete
   */
  getResponsableUsers() {
    this.userService.getUsers(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken
      ).subscribe((users: Responsable[]) => {
        this.responsables = users;
        this.autocompleteFilter();
      });
  }

  /**
   * Fill input with de selected value
   * @param responsable autoComplete value
   */
  displayFn(responsable: Responsable): string {
    return responsable && responsable.name ? responsable.name : '';
  }

  /**
   * Create task in drupal
   */
  createTask() {
    if (this.createTaskForm.invalid) {
      return false;
    }

    const { title, finish_time, description } = this.createTaskForm.value;
    const newTask: NewTask = {
      title,
      finish_time,
      description,
      responsable: {
        name: this.createTaskForm.value.responsable.name,
        id: this.createTaskForm.value.responsable.id,
      },
    };

    this.tasksService.createTask(
        this.loginService.userValue.authtoken,
        this.loginService.userValue.csrfToken,
        newTask
      ).subscribe(() => {
        this.snackBar.open('¡Tarea creada correctamente!', '' , {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        setTimeout(() => {
          this.router.navigateByUrl('/tasks', { skipLocationChange: true })
            .then(() => this.router.navigate(['/tasks/create']));
        }, 3000);
      });
  }

}
