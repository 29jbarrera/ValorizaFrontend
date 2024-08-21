import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ButtonModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent {
  form = new FormGroup<any>({});
  @Input() public model: any;
  @Input() options: FormlyFormOptions = {};
  @Input() fields: FormlyFieldConfig[] = [];

  @Input() title: string = 'TODO: Form';
  @Input() role: string = 'TODO: role';
  @Input() submit_text: string = 'TODO: submit';

  checked = false;
  constructor(public modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    if (this.form.invalid) {
      this.checked = true;
      Object.keys(this.form.controls).forEach((key: string) => {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].markAsTouched();
      });
      return;
    }
    this.modalController.dismiss(this.model, this.role);
  }

  get_disabled() {
    if (!this.checked) {
      return false;
    }
    return this.form.invalid;
  }
}
