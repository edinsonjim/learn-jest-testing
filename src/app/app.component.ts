import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'learn-jest-testing-';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.fetchTask(1).subscribe();
  }
}
