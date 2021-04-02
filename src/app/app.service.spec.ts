import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppService } from './app.service';
import { Task, TaskDecorated } from './models/user';

const dummyTasksResponse: Task[] = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    completed: false,
  },
];

const dummyTaskResponse: Task = dummyTasksResponse[0];

const decoratedDummyTaskResponse: TaskDecorated = {
  ...dummyTaskResponse,
  loaded: false,
};

describe('AppService', () => {
  let service: AppService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });

    injector = getTestBed();
    service = injector.inject(AppService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('fetchTasks() should return data', () => {
    service.fetchTasks().subscribe((resp) => {
      expect(resp).toEqual(dummyTasksResponse);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos'
    );
    req.flush(dummyTasksResponse);
  });

  it('fetchTask(1) should return data', () => {
    service.fetchTask(1).subscribe((resp) => {
      expect(resp).toEqual(decoratedDummyTaskResponse);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyTaskResponse);
  });
});
