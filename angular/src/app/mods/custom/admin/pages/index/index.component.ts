import { Component } from '@angular/core';
import { LayoutComponent } from '@mod/custom/admin/components/layout/layout.component';
import { CardComponent } from '@mod/custom/admin/components/card/card.component';
import { TablecrudComponent } from '@mod/custom/admin/components/tablecrud/tablecrud.component';
import { ModalComponent } from '@mod/custom/admin/components/modal/modal.component';
import { GridcrudComponent } from '@mod/custom/admin/components/gridcrud/gridcrud.component';
import { SearchComponent } from '@mod/custom/admin/components/search/search.component';
import { ReportComponent } from '@mod/custom/admin/components/report/report.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LayoutComponent,  
    SearchComponent,
    ReportComponent,
    CardComponent,
    ModalComponent,
    TablecrudComponent,
    GridcrudComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {

}
