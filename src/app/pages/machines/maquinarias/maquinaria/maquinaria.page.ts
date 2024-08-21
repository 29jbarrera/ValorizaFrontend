import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  MaquinariaDto,
  SeguroDto,
  SubFamiliaTinyViewDtoPaginatedResult,
} from '@valoriza/web-commons';
import { MaquinariaService } from '../maquinarias.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { HeaderComponent } from './maquinaria/components/header/header.component';
import { DatosGeneralesComponent } from './maquinaria/components/datos-generales/datos-generales.component';
import { EquipamientoComponent } from './maquinaria/components/equipamiento/equipamiento.component';
import { SeguroEImpuestoComponent } from './maquinaria/components/seguro-e-impuesto/seguro-e-impuesto.component';
import { MantenimientoComponent } from './maquinaria/components/mantenimiento/mantenimiento.component';
import { DocumentacionComponent } from './maquinaria/components/documentacion/documentacion.component';
import { ImagenesComponent } from './maquinaria/components/imagenes/imagenes.component';
import { SelectorType, ValorizaTypesService } from '@valoriza/web-components';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinaria.page.html',
  styleUrls: ['./maquinaria.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarModule,
    HeaderComponent,
    DatosGeneralesComponent,
    EquipamientoComponent,
    SeguroEImpuestoComponent,
    MantenimientoComponent,
    DocumentacionComponent,
    ImagenesComponent,
    ToastModule,
  ],
  providers: [MessageService],
})
export class MaquinariaPage implements OnInit {
  maquinaria!: MaquinariaDto;
  seguro!: SeguroDto;

  // DATOS GENERALES
  centros: SelectorType[] = [];
  centros_compras: SelectorType[] = [];
  familias: SelectorType[] = [];
  subfamilias: SelectorType[] = [];
  combutibles: SelectorType[] = [];
  emisiones: SelectorType[] = [];
  servicios: SelectorType[] = [];
  estados_maquinaria: SelectorType[] = [];

  // SEGUROS
  tipos_seguros: SelectorType[] = [];
  estados_seguros: SelectorType[] = [];

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _maquinariaService: MaquinariaService,
    private _messageService: MessageService,
    private valorizaService: ValorizaTypesService
  ) {}

  ngOnInit() {
    // TODO:
    // getCentros()
    // getCentrosCostes()
    // getEmisiones()
    // getServicios()
    // getEstadosMaquinaria()
    // getTiposDeSeguros()
    // getEstadosSeguros()

    this.getFamilias();
    this.getSubFamilias();
    this.getCombustibles();
    this.getSeguroByID();
    this.getMaquinariaByID();




    // this.valorizaService.getNivelEmisiones()
    // this.valorizaService.getTipoServicio()
    // this.valorizaService.getEstadoMaquinaria()
    // this.valorizaService.getTipoSeguro()
    // this.valorizaService.getEstadoSeguro()
  }

  private getIdMaquinaria() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  async getMaquinariaByID() {
    const id = this.getIdMaquinaria();
    this.maquinaria = await this._maquinariaService.getMaquinariaByID(id);
    this.loading = false;
  }

  async getSeguroByID() {
    const id = this.getIdMaquinaria();
    this.seguro = await this._maquinariaService.getSeguroByID(id);
  }

  async getFamilias() {
    this.familias = await this._maquinariaService.getFamilias();
  }

  async getSubFamilias() {
    this.subfamilias = await this._maquinariaService.getSubFamilias();
  }

  async getCombustibles() {
    this.combutibles = await this._maquinariaService.getTiposCombustible();
  }

  async getEmisiones() {}

  async save_changes_datos_generales(model: any) {
    console.error('TODO: Editar Datos Generales', { model });
    return;
    try {
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Datos Guardados',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async save_changes_seguros_e_impuestos(model: any) {
    console.error('TODO: Editar Seguros e Impuestos', { model });
    return;
    try {
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Datos Guardados',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }
}
