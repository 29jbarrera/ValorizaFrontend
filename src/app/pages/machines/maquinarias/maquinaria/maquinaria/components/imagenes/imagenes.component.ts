import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaquinariaDto } from '@valoriza/web-commons';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule],
})
export class ImagenesComponent implements OnInit {
  @Input() maquinaria!: MaquinariaDto;
  constructor() {}

  ngOnInit() {}
}
