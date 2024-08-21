import { Component, OnInit } from '@angular/core';
import { TableDocumentosComponent } from './table-documentos/table-documentos.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  standalone: true,
  imports: [
    TableDocumentosComponent,
  ],
})
export class DocumentosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
