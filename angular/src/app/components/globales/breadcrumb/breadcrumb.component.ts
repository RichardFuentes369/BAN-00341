import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from './service/breadcrumb.service';

@Component({
  selector: 'app-globales-breadcrumbs',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(data => {
      this.breadcrumbs = data;
    });
  }
}