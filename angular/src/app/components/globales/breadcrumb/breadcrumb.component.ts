import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './service/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from './interface/breadcrumb.interface';

@Component({
  selector: 'app-globales-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    // Al usar BehaviorSubject, esto recibirá el último valor inmediatamente
    this.breadcrumbService.breadcrumbs$.subscribe(data => {
      this.breadcrumbs = data;
    });
  }
}