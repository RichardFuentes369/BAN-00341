import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, timer, Observable } from 'rxjs';

@Component({
  selector: 'app-globales-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {

  constructor(
  ) {}

  now$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date())
  );
}