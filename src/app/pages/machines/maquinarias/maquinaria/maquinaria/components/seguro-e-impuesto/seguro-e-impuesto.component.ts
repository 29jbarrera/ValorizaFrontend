import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { SeguroDto } from '@valoriza/web-commons';
import { SelectorType } from '@valoriza/web-components';
import { AccordionModule } from 'primeng/accordion';
import { get_fields_seguros_e_impuestos } from './types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-seguro-e-impuesto',
  templateUrl: './seguro-e-impuesto.component.html',
  styleUrls: ['./seguro-e-impuesto.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule, ReactiveFormsModule, FormlyModule],
})
export class SeguroEImpuestoComponent implements OnInit {
  
  @Input() seguro!: SeguroDto;

  // TODO: Tipos seguros y Estados de Seguros
  @Input() tipos_seguros: SelectorType[] = [];
  @Input() estados_seguros: SelectorType[] = [];
  @Input() codigos_monedas: SelectorType[] = [];

  @Output() save = new EventEmitter();

  form_seguro_e_impuesto = new FormGroup<any>({});
  model_seguro_e_impuestos: any = {};
  options_seguro_e_impuestos: FormlyFormOptions = {};
  fields_seguro_e_impuestos: FormlyFieldConfig[] = [];

  constructor() {}

  ngOnInit() {
    this.model_seguro_e_impuestos = {
      codigo: this.seguro.codigo,
      aseguradora: this.seguro.aseguradora,
      codTipoSeguro: this.seguro.codTipoSeguro,
      codEstadoSeguro: this.seguro.codEstadoSeguro,
      fechaInicio: this.seguro.fechaInicio,
      fechaFin: this.seguro.fechaFin,
      importe: this.seguro.importe,
      codMoneda: this.seguro.codMoneda,
      nombre: null,
      // TODO: Falta los datos de año del impuesto, importe del impuesto y codigo moneda del impuesto
      anyoImpuesto: '',
      importeImpuesto: 0,
      codMonedaImpuesto: 'EUR',
    };

    this.fields_seguro_e_impuestos = get_fields_seguros_e_impuestos(
      this.tipos_seguros,
      this.estados_seguros,
      this.codigos_monedas
    );
  }

  save_changes() {
    if (this.form_seguro_e_impuesto.invalid) {
      Object.keys(this.form_seguro_e_impuesto.controls).forEach((key: string) => {
        this.form_seguro_e_impuesto.controls[key].markAsDirty();
        this.form_seguro_e_impuesto.controls[key].markAsTouched();
      });
      return;
    }

    this.save.emit(this.model_seguro_e_impuestos);
  }
}
