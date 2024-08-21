import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { SubFamiliaDto } from '@valoriza/web-commons';
import { get_lang_description, LANG_ES, FilterSubfamilies } from '@valoriza/web-components';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-create-or-edit-subfamily',
  templateUrl: './modal-create-or-edit-subfamily.component.html',
  styleUrls: ['./modal-create-or-edit-subfamily.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    FilterSubfamilies,
  ],
})
export class ModalCreateOrEditSubfamilyComponent implements OnInit {
  @Input() title: string = 'TODO: Form';
  @Input() role: string = 'TODO: role';
  @Input() submit_text: string = 'TODO: submit';
  @Input() subfamilies: SubFamiliaDto[] = [];

  selected_subfamily!: SubFamiliaDto;
  search_term: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.selected_subfamily, this.role);
  }

  get_description_subfamily(subfamily: SubFamiliaDto): string {
    return get_lang_description(subfamily.langs!, LANG_ES);
  }

  searchToolbar(event: any) {
    this.search_term = event?.target?.value || '';
  }

  reset() {
    this.search_term = '';
  }
}
