import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Task, TaskDecorated } from './models/user';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('https://jsonplaceholder.typicode.com/todos');
  }

  fetchTask(todoId: number): Observable<TaskDecorated> {
    return this.http
      .get<Task>(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .pipe(
        map((task) => {
          return this.decorateLoadedField(task);
        })
      );
  }

  private decorateLoadedField(task: Task): TaskDecorated {
    return {
      ...task,
      loaded: true,
    };
  }
}
