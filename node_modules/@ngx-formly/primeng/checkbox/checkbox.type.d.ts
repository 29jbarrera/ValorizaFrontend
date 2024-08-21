import { Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field';
import * as i0 from "@angular/core";
interface CheckboxProps extends FormlyFieldProps {
}
export interface FormlyCheckboxFieldConfig extends FormlyFieldConfig<CheckboxProps> {
    type: 'checkbox' | Type<FormlyFieldCheckbox>;
}
export declare class FormlyFieldCheckbox extends FieldType<FieldTypeConfig<CheckboxProps>> {
    defaultOptions: {
        props: {
            hideLabel: boolean;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldCheckbox, "formly-field-primeng-checkbox", never, {}, {}, never, never>;
}
export {};
