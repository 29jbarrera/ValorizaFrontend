import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { MarcaDto } from '@valoriza/web-commons';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-create-or-edit-marca',
  templateUrl: './modal-create-or-edit-marca.component.html',
  styleUrls: ['./modal-create-or-edit-marca.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
  ],
})
export class ModalCreateOrEditMarcaComponent  implements OnInit {
  @Input() title: string = 'TODO: Form';
  @Input() role: string = 'TODO: role';
  @Input() submit_text: string = 'TODO: submit';
  @Input() marcas: MarcaDto[] = [];

  selected_marca!: MarcaDto;
  search_term: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.selected_marca, this.role);
  }

  searchToolbar(event: any) {
    this.search_term = event?.target?.value || '';
  }

  reset() {
    this.search_term = '';
  }

}
