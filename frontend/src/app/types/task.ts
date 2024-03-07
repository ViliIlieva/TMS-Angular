import{Comment} from './comment';

export interface Task {
  status: string;
  taskType: string;
  comments: string[] | Comment[];
  _taskId: string;
  taskName: string;
  taskText: string;
  _userId: string;
}
