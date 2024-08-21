import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { MaquinariaDto } from '@valoriza/web-commons';
import { AccordionModule } from 'primeng/accordion';
import { get_fields_datos_generales_maquinaria } from './types';
import { SelectorType } from '@valoriza/web-components';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    FormlyModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class DatosGeneralesComponent implements OnInit {
  @Input() maquinaria!: MaquinariaDto;
  @Input() centros: SelectorType[] = [];
  @Input() centros_compras: SelectorType[] = [];
  @Input() familias: SelectorType[] = [];
  @Input() subfamilias: SelectorType[] = [];
  @Input() combutibles: SelectorType[] = [];
  @Input() emisiones: SelectorType[] = [];
  @Input() servicios: SelectorType[] = [];
  @Input() estados_maquinaria: SelectorType[] = [];

  @Output() save = new EventEmitter();

  form_datos_generales = new FormGroup<any>({});
  fields_datos_generales: FormlyFieldConfig[] = [];
  model_datos_generales: any = {};
  options_datos_generales: FormlyFormOptions = {};

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.model_datos_generales = {
      esImplemento: this.maquinaria.esImplemento,
      operativa: this.maquinaria.operativa,
      avisoTracking: this.maquinaria.avisoTracking,
      matricula: this.maquinaria.matricula,
      bastidor: this.maquinaria.bastidor,
      fechaMatriculacion: this.maquinaria.fechaMatriculacion,
      idCentroCompra: this.maquinaria.idCentroCompra,
      idCentro: this.maquinaria.idCentro,
      idFamilia: this.maquinaria.idFamilia,
      idSubFamilia: this.maquinaria.idSubFamilia,
      codTipoCombustible: this.maquinaria.codTipoCombustible,
      codNivelEmisiones: this.maquinaria.codNivelEmisiones,
      servicio: this.maquinaria.servicio,
      codEstadoMaquinaria: this.maquinaria.codEstadoMaquinaria,
      conductor: this.maquinaria.conductor,
    };

    if (this.familias.length && this.subfamilias.length) {
      this.fields_datos_generales = get_fields_datos_generales_maquinaria(
        this.centros,
        this.centros_compras,
        this.familias,
        this.subfamilias,
        this.combutibles,
        this.emisiones,
        this.servicios,
        this.estados_maquinaria
      );
    }
  }

  save_changes() {
    if (this.form_datos_generales.invalid) {
      Object.keys(this.form_datos_generales.controls).forEach((key: string) => {
        this.form_datos_generales.controls[key].markAsDirty();
        this.form_datos_generales.controls[key].markAsTouched();
      });
      return;
    }

    this.save.emit(this.model_datos_generales);
  }
}
