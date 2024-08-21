import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaquinariaDto } from '@valoriza/web-commons';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TablaChasisComponent } from './tabla-chasis/tabla-chasis.component';

@Component({
  selector: 'app-equipamiento',
  templateUrl: './equipamiento.component.html',
  styleUrls: ['./equipamiento.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule, TabViewModule, TablaChasisComponent],
})
export class EquipamientoComponent implements OnInit {
  @Input() maquinaria!: MaquinariaDto;

  constructor() {}

  ngOnInit() {}

 
}
