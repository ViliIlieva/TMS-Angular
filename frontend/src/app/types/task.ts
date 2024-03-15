import{Comment} from './comment';

export interface Task {
  status: string;
  taskType: string;
  comments: string[] | Comment[];
  _id: string;
  taskName: string;
  taskText: string;
  _userId: string;
}
