import { Component, OnInit } from '@angular/core';
import { ParteTrabajoDto } from '@valoriza/web-commons';
import { PartesService } from '../partes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DividerComponent } from '@valoriza/web-components';
import { MecanicosComponent } from './mecanicos/mecanicos.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './materiales/materiales.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { get_field_parte_trabajo } from './types';

@Component({
  standalone: true,
  templateUrl: './parte-trabajo.page.html',
  styleUrls: ['./parte-trabajo.page.scss'],
  imports: [
    CommonModule,
    DividerComponent,
    ProgressBarModule,
    ButtonModule,
    MecanicosComponent,
    MaterialesComponent,
    DocumentosComponent,
    ReactiveFormsModule,
    FormlyModule
  ],
})
export class ParteTrabajoPage implements OnInit {
  parte: ParteTrabajoDto | null = null;
  loading: boolean = true;

  form = new FormGroup<any>({});
  fields: FormlyFieldConfig[] = get_field_parte_trabajo();
  model: any = {};
  options: FormlyFormOptions = {};

  constructor(
    private PartesService: PartesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.parte);
  }

  ngOnInit() {
    this.getParteById();
  }

  async getParteById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.parte = await this.PartesService.getParteById(id);

    console.log(this.parte);
    this.loading = false;
  }
}
