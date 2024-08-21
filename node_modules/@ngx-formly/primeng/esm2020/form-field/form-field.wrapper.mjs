import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
import * as i2 from "@angular/common";
export class FormlyWrapperFormField extends FieldWrapper {
}
FormlyWrapperFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyWrapperFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyWrapperFormField, selector: "formly-wrapper-primeng-form-field", usesInheritance: true, ngImport: i0, template: `
    <div class="p-field">
      <label *ngIf="props.label && props.hideLabel !== true" [for]="id">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
      <ng-container #fieldComponent></ng-container>

      <small *ngIf="showError" class="p-error">
        <formly-validation-message class="ui-message-text" [field]="field"></formly-validation-message>
      </small>
    </div>
  `, isInline: true, components: [{ type: i1.ɵFormlyValidationMessage, selector: "formly-validation-message", inputs: ["field"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-wrapper-primeng-form-field',
                    template: `
    <div class="p-field">
      <label *ngIf="props.label && props.hideLabel !== true" [for]="id">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
      <ng-container #fieldComponent></ng-container>

      <small *ngIf="showError" class="p-error">
        <formly-validation-message class="ui-message-text" [field]="field"></formly-validation-message>
      </small>
    </div>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL3ByaW1lbmcvZm9ybS1maWVsZC9zcmMvZm9ybS1maWVsZC53cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBK0QsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQXVCN0csTUFBTSxPQUFPLHNCQUF1QixTQUFRLFlBQWlEOztvSEFBaEYsc0JBQXNCO3dHQUF0QixzQkFBc0IsZ0dBZHZCOzs7Ozs7Ozs7Ozs7R0FZVDs0RkFFVSxzQkFBc0I7a0JBaEJsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciwgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZpZWxkUHJvcHMgYXMgQ29yZUZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlGaWVsZFByb3BzIGV4dGVuZHMgQ29yZUZvcm1seUZpZWxkUHJvcHMge1xuICBoaWRlUmVxdWlyZWRNYXJrZXI/OiBib29sZWFuO1xuICBoaWRlTGFiZWw/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktd3JhcHBlci1wcmltZW5nLWZvcm0tZmllbGQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwLWZpZWxkXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJwcm9wcy5sYWJlbCAmJiBwcm9wcy5oaWRlTGFiZWwgIT09IHRydWVcIiBbZm9yXT1cImlkXCI+XG4gICAgICAgIHt7IHByb3BzLmxhYmVsIH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwicHJvcHMucmVxdWlyZWQgJiYgcHJvcHMuaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8bmctY29udGFpbmVyICNmaWVsZENvbXBvbmVudD48L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHNtYWxsICpuZ0lmPVwic2hvd0Vycm9yXCIgY2xhc3M9XCJwLWVycm9yXCI+XG4gICAgICAgIDxmb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlIGNsYXNzPVwidWktbWVzc2FnZS10ZXh0XCIgW2ZpZWxkXT1cImZpZWxkXCI+PC9mb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlPlxuICAgICAgPC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5V3JhcHBlckZvcm1GaWVsZCBleHRlbmRzIEZpZWxkV3JhcHBlcjxGb3JtbHlGaWVsZENvbmZpZzxGb3JtbHlGaWVsZFByb3BzPj4ge31cbiJdfQ==