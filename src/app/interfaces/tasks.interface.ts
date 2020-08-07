import { Responsable } from './responsable.interface';
import { UserInfo } from './user.interface';

export interface NewTask {
  title: string;
  finish_time: string;
  description: string;
  responsable: Responsable;
  id?: string,
  type?: any[];
  _links?: any;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  finish_time: string;
  status: string;
  responsable: UserInfo;
  responsable_id?: string;
}
