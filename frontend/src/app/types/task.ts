import{Comment} from './comment';

export interface Task {
  _id: any;
  taskName: string;
  taskText: string;
  status: string;
  taskType: string;
  comments: string[] | Comment[];
  _userId: string;
}
