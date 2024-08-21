import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaquinariaDto } from '@valoriza/web-commons';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule]
})
export class DocumentacionComponent implements OnInit {

  @Input() maquinaria!: MaquinariaDto;
  constructor() {}

  ngOnInit() {}
}
