import { Component, OnInit } from '@angular/core';
import { TableMaterialesComponent } from './table-materiales/table-materiales.component';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
  standalone: true,
  imports: [
    TableMaterialesComponent
  ]
})
export class MaterialesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
