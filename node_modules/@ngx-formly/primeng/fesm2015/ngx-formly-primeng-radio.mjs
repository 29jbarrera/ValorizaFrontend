import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@ngx-formly/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import * as i3 from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@ngx-formly/core/select';
import { FormlySelectModule } from '@ngx-formly/core/select';
import * as i1 from 'primeng/radiobutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormlyFormFieldModule } from '@ngx-formly/primeng/form-field';

class FormlyFieldRadio extends FieldType {
    get disabledControl() {
        return new FormControl({ value: this.formControl.value, disabled: true });
    }
}
FormlyFieldRadio.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldRadio.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldRadio, selector: "formly-field-primeng-radio", usesInheritance: true, ngImport: i0, template: `
    <div class="p-field-radiobutton" *ngFor="let option of props.options | formlySelectOptions : field | async">
      <p-radioButton
        [name]="field.name || id"
        [formControl]="option.disabled ? disabledControl : formControl"
        [label]="option.label"
        [value]="option.value"
      >
      </p-radioButton>
    </div>
  `, isInline: true, components: [{ type: i1.RadioButton, selector: "p-radioButton", inputs: ["value", "formControlName", "name", "disabled", "label", "tabindex", "inputId", "ariaLabelledBy", "ariaLabel", "style", "styleClass", "labelStyleClass"], outputs: ["onClick", "onFocus", "onBlur"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i2.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-primeng-radio',
                    template: `
    <div class="p-field-radiobutton" *ngFor="let option of props.options | formlySelectOptions : field | async">
      <p-radioButton
        [name]="field.name || id"
        [formControl]="option.disabled ? disabledControl : formControl"
        [label]="option.label"
        [value]="option.value"
      >
      </p-radioButton>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });

class FormlyRadioModule {
}
FormlyRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyRadioModule, declarations: [FormlyFieldRadio], imports: [CommonModule,
        ReactiveFormsModule,
        RadioButtonModule,
        FormlyFormFieldModule,
        FormlySelectModule, i1$1.FormlyModule] });
FormlyRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyRadioModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            RadioButtonModule,
            FormlyFormFieldModule,
            FormlySelectModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'radio',
                        component: FormlyFieldRadio,
                        wrappers: ['form-field'],
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyFieldRadio],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RadioButtonModule,
                        FormlyFormFieldModule,
                        FormlySelectModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'radio',
                                    component: FormlyFieldRadio,
                                    wrappers: ['form-field'],
                                },
                            ],
                        }),
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormlyFieldRadio, FormlyRadioModule };
//# sourceMappingURL=ngx-formly-primeng-radio.mjs.map
