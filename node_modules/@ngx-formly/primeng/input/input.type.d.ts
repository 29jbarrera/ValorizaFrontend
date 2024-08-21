import { Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field';
import * as i0 from "@angular/core";
interface InputProps extends FormlyFieldProps {
}
export interface FormlyInputFieldConfig extends FormlyFieldConfig<InputProps> {
    type: 'input' | Type<FormlyFieldInput>;
}
export declare class FormlyFieldInput extends FieldType<FieldTypeConfig<InputProps>> {
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldInput, "formly-field-primeng-input", never, {}, {}, never, never>;
}
export {};
