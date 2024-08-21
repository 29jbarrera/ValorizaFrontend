import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaquinariaDto } from '@valoriza/web-commons';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule],
})
export class MantenimientoComponent implements OnInit {
  @Input() maquinaria!: MaquinariaDto;
  constructor() {}

  ngOnInit() {}
}
