import{Comment} from './comment';

export interface NewTask {
  taskName: string;
  taskText: string;
  status: string;
  taskType: string;
  comments: string[] | Comment[];
  _userId: string;
}
