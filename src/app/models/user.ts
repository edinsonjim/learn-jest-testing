export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskDecorated extends Task {
  loaded: boolean;
}
