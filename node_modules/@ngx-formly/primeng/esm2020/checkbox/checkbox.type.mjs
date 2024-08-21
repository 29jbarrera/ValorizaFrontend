import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "primeng/checkbox";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                hideLabel: true,
            },
        };
    }
}
FormlyFieldCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldCheckbox, selector: "formly-field-primeng-checkbox", usesInheritance: true, ngImport: i0, template: `
    <div class="p-field-checkbox">
      <p-checkbox
        [binary]="true"
        [label]="props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
        (onChange)="props.change && props.change(field, $event)"
      >
      </p-checkbox>
    </div>
  `, isInline: true, components: [{ type: i1.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-primeng-checkbox',
                    template: `
    <div class="p-field-checkbox">
      <p-checkbox
        [binary]="true"
        [label]="props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
        (onChange)="props.change && props.change(field, $event)"
      >
      </p-checkbox>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9wcmltZW5nL2NoZWNrYm94L3NyYy9jaGVja2JveC50eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBc0MsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUF5QmpGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxTQUF5QztJQWhCbEY7O1FBaUJXLG1CQUFjLEdBQUc7WUFDeEIsS0FBSyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1NBQ0YsQ0FBQztLQUNIOztpSEFOWSxtQkFBbUI7cUdBQW5CLG1CQUFtQiw0RkFkcEI7Ozs7Ozs7Ozs7O0dBV1Q7NEZBR1UsbUJBQW1CO2tCQWhCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvcHJpbWVuZy9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIENoZWNrYm94UHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5Q2hlY2tib3hGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPENoZWNrYm94UHJvcHM+IHtcbiAgdHlwZTogJ2NoZWNrYm94JyB8IFR5cGU8Rm9ybWx5RmllbGRDaGVja2JveD47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1wcmltZW5nLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwicC1maWVsZC1jaGVja2JveFwiPlxuICAgICAgPHAtY2hlY2tib3hcbiAgICAgICAgW2JpbmFyeV09XCJ0cnVlXCJcbiAgICAgICAgW2xhYmVsXT1cInByb3BzLmxhYmVsXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgICAob25DaGFuZ2UpPVwicHJvcHMuY2hhbmdlICYmIHByb3BzLmNoYW5nZShmaWVsZCwgJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICA8L3AtY2hlY2tib3g+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZENoZWNrYm94IGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxDaGVja2JveFByb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgaGlkZUxhYmVsOiB0cnVlLFxuICAgIH0sXG4gIH07XG59XG4iXX0=