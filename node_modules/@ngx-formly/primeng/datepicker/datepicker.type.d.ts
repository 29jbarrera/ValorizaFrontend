import { Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field';
import * as i0 from "@angular/core";
interface DatepickerProps extends FormlyFieldProps {
    defaultDate?: Date;
    dateFormat?: string;
    hourFormat?: string;
    showTime?: boolean;
    showIcon?: boolean;
    showButtonBar?: boolean;
    showOtherMonths?: boolean;
    selectOtherMonths?: boolean;
    selectionMode?: string;
    numberOfMonths?: number;
    inline?: boolean;
    readonlyInput?: boolean;
    touchUI?: boolean;
    monthNavigator?: boolean;
    yearNavigator?: boolean;
    yearRange?: string;
}
export interface FormlyDatepickerFieldConfig extends FormlyFieldConfig<DatepickerProps> {
    type: 'datepicker' | Type<FormlyFieldDatepicker>;
}
export declare class FormlyFieldDatepicker extends FieldType<FieldTypeConfig<DatepickerProps>> {
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldDatepicker, "formly-field-primeng-datepicker", never, {}, {}, never, never>;
}
export {};
