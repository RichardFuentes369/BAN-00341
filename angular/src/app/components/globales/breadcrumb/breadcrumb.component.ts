import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from './service/breadcrumb.service';

@Component({
  selector: 'app-globales-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(data => {
      this.breadcrumbs = data;
    });
  }
}