import { Component, Input, OnInit } from '@angular/core';
import { MaquinariaDto } from '@valoriza/web-commons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent  implements OnInit {

  @Input() maquinaria!: MaquinariaDto;

  constructor() { }

  ngOnInit() {}

}
