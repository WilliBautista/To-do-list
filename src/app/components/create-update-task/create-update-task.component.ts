// Core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// Interfaces
import { NewTask, Task } from 'src/app/interfaces/tasks.interface';
import { Responsable } from './../../interfaces/responsable.interface';
// Services
import { TasksService } from './../../services/tasks.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


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
  action: string;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.minDate = new Date();
    this.getResponsableUsers();

    switch (this.activatedRoute.snapshot.paramMap.get('action')) {
      case 'edit':
        this.action = 'edit';
        this.preloadTask();
        break;
      case 'create':
        this.action = 'create';
        break;
    }

  }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      finish_time: ['', Validators.required],
      description: ['', Validators.required],
      responsable: ['', Validators.required]
    });
  }

  /**
   * Direct access to the form controls
   */
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
   * Convert in lower and remove spaces
   * @param text string to format as link
   */
  lowerText(text: string): string {
    return text.toLowerCase().replace(/\s/ig, '-');
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
  createUpdateTask() {
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
      status: '1'
    };

    if (this.action === 'edit') {
      newTask.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.tasksService.updateTask(
          this.loginService.userValue.authtoken,
          this.loginService.userValue.csrfToken,
          newTask
        ).subscribe(() => {
          Swal.fire(`La tarea "${ newTask.title }" ha sido actualizada`, '', 'success')
              .then(() => {
                this.router.navigateByUrl(`/tasks/${ this.lowerText( newTask.title ) }/${ newTask.id }`);
              });
        });
    } else {
      this.tasksService.createTask(
          this.loginService.userValue.authtoken,
          this.loginService.userValue.csrfToken,
          newTask
        ).subscribe((res: any) => {
          const titleNew: string = res.title[0].value;
          const idNew: number = res.nid[0].value;

          Swal.fire(`La tarea "${ titleNew }" ha sido creada`, '', 'success')
              .then(() => {
                this.router.navigateByUrl(`/tasks/${ this.lowerText( titleNew ) }/${ idNew }`);
              });
        });
    }
  }

  preloadTask() {
    this.tasksService.getTask(
      this.loginService.userValue.authtoken,
      this.loginService.userValue.csrfToken,
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe((res: Task) => {
      this.createTaskForm.patchValue({
        title: res.title,
        description: res.description,
        finish_time: new Date(res.finish_time),
      });
    });
  }

}
