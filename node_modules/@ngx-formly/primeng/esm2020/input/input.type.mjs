import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtext";
import * as i4 from "@ngx-formly/core";
export class FormlyFieldInput extends FieldType {
}
FormlyFieldInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldInput, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldInput, selector: "formly-field-primeng-input", usesInheritance: true, ngImport: i0, template: `
    <input
      *ngIf="props.type !== 'number'; else numberTmp"
      pInputText
      [type]="props.type || 'text'"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
    <ng-template #numberTmp>
      <input type="number" pInputText [formControl]="formControl" [formlyAttributes]="field" />
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3.InputText, selector: "[pInputText]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-primeng-input',
                    template: `
    <input
      *ngIf="props.type !== 'number'; else numberTmp"
      pInputText
      [type]="props.type || 'text'"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
    <ng-template #numberTmp>
      <input type="number" pInputText [formControl]="formControl" [formlyAttributes]="field" />
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9wcmltZW5nL2lucHV0L3NyYy9pbnB1dC50eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBc0MsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBeUJqRixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBc0M7OzhHQUEvRCxnQkFBZ0I7a0dBQWhCLGdCQUFnQix5RkFkakI7Ozs7Ozs7Ozs7O0dBV1Q7NEZBR1UsZ0JBQWdCO2tCQWhCNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvcHJpbWVuZy9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIElucHV0UHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5SW5wdXRGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPElucHV0UHJvcHM+IHtcbiAgdHlwZTogJ2lucHV0JyB8IFR5cGU8Rm9ybWx5RmllbGRJbnB1dD47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1wcmltZW5nLWlucHV0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgICpuZ0lmPVwicHJvcHMudHlwZSAhPT0gJ251bWJlcic7IGVsc2UgbnVtYmVyVG1wXCJcbiAgICAgIHBJbnB1dFRleHRcbiAgICAgIFt0eXBlXT1cInByb3BzLnR5cGUgfHwgJ3RleHQnXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgLz5cbiAgICA8bmctdGVtcGxhdGUgI251bWJlclRtcD5cbiAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcElucHV0VGV4dCBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkSW5wdXQgZXh0ZW5kcyBGaWVsZFR5cGU8RmllbGRUeXBlQ29uZmlnPElucHV0UHJvcHM+PiB7fVxuIl19