import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FamiliaDto,
  SubFamiliaDto,
  UpdateSubFamiliaDto,
} from '@valoriza/web-commons';
import {
  CreateFamiliaCustom,
  CreateSubFamiliaCustom,
  FamiliasSubfamiliasService,
  UpdateFamiliaCustom,
} from '../familias-subfamilias.service';
import { TableModule } from 'primeng/table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ButtonCreateComponent,
  CommonTable,
  get_icon_boolean,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  Selection,
} from '@valoriza/web-components';
import { ModalController } from '@ionic/angular';
import {
  get_fields_edit_or_create_form_familia,
  get_fields_edit_form_subfamilia,
  get_fields_create_form_subfamilia,
} from './types';

@Component({
  selector: 'app-familias-subfamilias-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonCreateComponent,
  ],
  templateUrl: './familias-subfamilias-table.component.html',
  styleUrl: './familias-subfamilias-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FamiliasSubfamiliasTableComponent
  extends CommonTable<FamiliaDto>
  implements OnInit
{
  override rows = 10;

  constructor(
    private _familiasSubfamiliasService: FamiliasSubfamiliasService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.getNivelesMantenimientoChasis();
    this.updateTable();
  }

  public expandedRowsFamilias = {};
  public niveles_mantenimiento: Selection[] = [];

  override get_values(page = 1, perPage = 100) {
    return this._familiasSubfamiliasService.getFamilias(page, perPage);
  }

  async getNivelesMantenimientoChasis() {
    this.niveles_mantenimiento =
      await this._familiasSubfamiliasService.getNiveles();
  }

  async create_familia() {
    const fields = get_fields_edit_or_create_form_familia();
    const model: CreateFamiliaCustom = {
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    try {
      const { familia_created } =
        await this._familiasSubfamiliasService.createFamilia(data);

      this.value.unshift(familia_created);
      this.totalRecords += 1;

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Familia Creada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit_familia(familia: FamiliaDto) {
    const fields = get_fields_edit_or_create_form_familia();

    const model: UpdateFamiliaCustom = {
      id: familia.id,
      descripcion: this.get_name_family(familia),
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar',
        role: 'edit',
        submit_text: 'Editar',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'edit') return;

    try {
      const { familia_update } =
        await this._familiasSubfamiliasService.editFamilia(data);

      this.value = this.value.map((v) => {
        if (v.id === familia_update.id) {
          return { ...v, ...familia_update };
        }
        return v;
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Familia Actualizada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async create_subfamilia(familia: FamiliaDto) {
    const fields = get_fields_create_form_subfamilia(
      this.niveles_mantenimiento
    );

    const model: CreateSubFamiliaCustom = {
      idFamilia: familia.id!,
      grua: false,
      fichaTecnica: false,
      inspeccionTecnica: false,
      permisoCirculacion: false,
      seguro: false,
      tarjetaTransporte: false,
      tacografo: false,
      marcadoCe: false,
      conformidad: false,
      peso: false,
      gnc: false,
      idNivelMantenimientoChasis: undefined,
      idNivelMantenimientoEquipo: undefined,
      idNivelMantenimientoImplemento: undefined,
      esImplemento: false,
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear',
        role: 'create',
        submit_text: 'Crear',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    try {
      const { subfamilia_created } =
        await this._familiasSubfamiliasService.createSubFamilia(data);
      
      this.value = this.value.map((f) => {
        return {
          ...f,
          subFamilias: [
            ...(f.subFamilias || []),
            {
              ...subfamilia_created,
              nivelMantenimientoChasis: get_niveles_updated(
                this.niveles_mantenimiento,
                subfamilia_created.idNivelMantenimientoChasis,
                { id: subfamilia_created.id }
              ),
              nivelMantenimientoEquipo: get_niveles_updated(
                this.niveles_mantenimiento,
                subfamilia_created.idNivelMantenimientoEquipo,
                { id: subfamilia_created.id }
              ),
              nivelMantenimientoImplemento: get_niveles_updated(
                this.niveles_mantenimiento,
                subfamilia_created.idNivelMantenimientoImplemento,
                { id: subfamilia_created.id }
              ),
            },
          ],
        };
      });

      this.totalRecords += 1;

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Subfamilia Creada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit_subfamilia(subfamilia: SubFamiliaDto) {
    const fields = get_fields_edit_form_subfamilia(this.niveles_mantenimiento);

    const model: UpdateSubFamiliaDto = {
      id: subfamilia.id,
      idFamilia: subfamilia.idFamilia!,
      grua: subfamilia.grua!,
      fichaTecnica: subfamilia.fichaTecnica!,
      inspeccionTecnica: subfamilia.inspeccionTecnica!,
      permisoCirculacion: subfamilia.permisoCirculacion!,
      seguro: subfamilia.seguro!,
      tarjetaTransporte: subfamilia.tarjetaTransporte!,
      tacografo: subfamilia.tacografo!,
      marcadoCe: subfamilia.marcadoCe!,
      conformidad: subfamilia.conformidad!,
      peso: subfamilia.peso!,
      gnc: subfamilia.gnc!,
      idNivelMantenimientoChasis: subfamilia.idNivelMantenimientoChasis,
      idNivelMantenimientoEquipo: subfamilia.idNivelMantenimientoEquipo,
      idNivelMantenimientoImplemento: subfamilia.idNivelMantenimientoImplemento,
      esImplemento: subfamilia.esImplemento!,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar',
        role: 'edit',
        submit_text: 'Editar',
      },
    });
    await modal.present();

    const modalDissmiss = await modal.onWillDismiss();

    const data = modalDissmiss.data as UpdateSubFamiliaDto;
    const role = modalDissmiss.role;

    if (role !== 'edit') return;

    try {
      const response = await this._familiasSubfamiliasService.editSubFamilia(
        data
      );

      const {
        grua,
        fichaTecnica,
        inspeccionTecnica,
        permisoCirculacion,
        seguro,
        tarjetaTransporte,
        tacografo,
        marcadoCe,
        conformidad,
        peso,
        gnc,
        idNivelMantenimientoChasis,
        idNivelMantenimientoEquipo,
        idNivelMantenimientoImplemento,
        esImplemento,
      } = data;

      this.value = this.value.map((f) => {
        return {
          ...f,
          subFamilias: f.subFamilias?.map((s) => {
            if (s.id === response.id) {
              return {
                ...s,
                grua,
                fichaTecnica,
                inspeccionTecnica,
                permisoCirculacion,
                seguro,
                tarjetaTransporte,
                tacografo,
                marcadoCe,
                conformidad,
                peso,
                gnc,
                esImplemento,
                idNivelMantenimientoChasis,
                nivelMantenimientoChasis: get_niveles_updated(
                  this.niveles_mantenimiento,
                  idNivelMantenimientoChasis,
                  s.nivelMantenimientoChasis
                ),
                idNivelMantenimientoEquipo,
                nivelMantenimientoEquipo: get_niveles_updated(
                  this.niveles_mantenimiento,
                  idNivelMantenimientoEquipo,
                  s.nivelMantenimientoEquipo
                ),
                idNivelMantenimientoImplemento,
                nivelMantenimientoImplemento: get_niveles_updated(
                  this.niveles_mantenimiento,
                  idNivelMantenimientoImplemento,
                  s.nivelMantenimientoImplemento
                ),
              };
            }

            return s;
          }),
        };
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Subfamilia Actualizada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async confirm_delete_familia(familiaSubfamilia: FamiliaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar Familia',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_familia(familiaSubfamilia);
      },
    });
  }

  async delete_familia(familia: FamiliaDto) {
    try {
      await this._familiasSubfamiliasService.deleteFamilia(familia.id!);

      this.value = this.value.filter((o) => o.id !== familia.id);
      this.totalRecords -= 1;

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Familia Eliminada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async confirm_delete_subfamilia(familiaSubfamilia: FamiliaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar Familia',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_subfamilia(familiaSubfamilia);
      },
    });
  }

  async delete_subfamilia(subfamilia: SubFamiliaDto) {
    try {
      await this._familiasSubfamiliasService.deleteSubFamilia(subfamilia.id!);

      this.value = this.value.map((v) => {
        return {
          ...v,
          subFamilias: v.subFamilias?.filter((s) => s.id !== subfamilia.id),
        };
      });

      this.totalRecords -= 1;

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Subfamilia Eliminada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  get_name_family(familia: FamiliaDto): string {
    return get_lang_description(familia.langs!, LANG_ES);
  }

  get_name_subfamiliy(subfamilia: SubFamiliaDto): string {
    return get_lang_description(subfamilia.langs!, LANG_ES);
  }

  get_icon_check_or_unchecked(check: boolean) {
    return get_icon_boolean(check);
  }
}

function get_niveles_updated(
  niveles: any[],
  idNuevo: number | undefined,
  current: SubFamiliaDto['nivelMantenimientoImplemento'] | undefined
): SubFamiliaDto['nivelMantenimientoImplemento'] | undefined {
  if (!current) {
    return current;
  }

  if (idNuevo === undefined) {
    return current;
  }

  niveles.forEach((n) => {
    if (n.value === idNuevo) {
      current!.id = idNuevo;
      current!.codigo = n.label;
    }
  });
  return current;
}
