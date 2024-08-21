import { Component } from '@angular/core';
import { RepostajesMaquinariaTableComponent } from './repostajes-maquinaria-table/repostajes-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { RepostajeMaquinariaFormComponent } from './repostaje-maquinaria-form/repostaje-maquinaria-form.component';

@Component({
  selector: 'app-repostajes',
  standalone: true,
  imports: [
    RepostajesMaquinariaTableComponent,
    RepostajeMaquinariaFormComponent,
    HeaderComponent,
  ],
  templateUrl: './repostajes.component.html',
  styleUrl: './repostajes.component.scss',
})
export class RepostajesMaquinariaComponent {}
