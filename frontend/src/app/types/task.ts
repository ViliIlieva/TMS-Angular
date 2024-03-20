import{Comment} from './comment';

export interface Task {
  _id: any;
  taskName: string;
  taskText: string;
  status: string;
  taskType: string;
  _userId: string;
}
