import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@valoriza/web-components';
import { MaquinariaTableComponent } from './maquinarias-table/maquinarias-table.component';

@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinarias.page.html',
  styleUrls: ['./maquinarias.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, MaquinariaTableComponent]
})
export class MaquinariasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
