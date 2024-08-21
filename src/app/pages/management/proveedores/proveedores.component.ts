import { Component } from '@angular/core';
import { ProveedoresTableComponent } from './proveedores-table/proveedores-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [ProveedoresTableComponent,ProveedoresFormComponent , HeaderComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {

}
