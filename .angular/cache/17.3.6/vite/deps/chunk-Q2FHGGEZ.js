import {
  FieldWrapper,
  FormlyModule,
  FormlyValidationMessage
} from "./chunk-XWCM64IJ.js";
import {
  ReactiveFormsModule
} from "./chunk-W4EOIAOZ.js";
import {
  CommonModule,
  NgIf
} from "./chunk-JA6YC5PI.js";
import {
  Component,
  NgModule,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-MXJMTFCA.js";

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-form-field.mjs
function FormlyWrapperFormField_label_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵtext(1, "*");
    ɵɵelementEnd();
  }
}
function FormlyWrapperFormField_label_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "label", 4);
    ɵɵtext(1);
    ɵɵtemplate(2, FormlyWrapperFormField_label_1_span_2_Template, 2, 0, "span", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("for", ctx_r0.id);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.props.label, " ");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.props.required && ctx_r0.props.hideRequiredMarker !== true);
  }
}
function FormlyWrapperFormField_small_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "small", 7);
    ɵɵelement(1, "formly-validation-message", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("field", ctx_r0.field);
  }
}
var FormlyWrapperFormField = class extends FieldWrapper {
};
FormlyWrapperFormField.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyWrapperFormField_BaseFactory;
  return function FormlyWrapperFormField_Factory(t) {
    return (ɵFormlyWrapperFormField_BaseFactory || (ɵFormlyWrapperFormField_BaseFactory = ɵɵgetInheritedFactory(FormlyWrapperFormField)))(t || FormlyWrapperFormField);
  };
})();
FormlyWrapperFormField.ɵcmp = ɵɵdefineComponent({
  type: FormlyWrapperFormField,
  selectors: [["formly-wrapper-primeng-form-field"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 5,
  vars: 2,
  consts: [["fieldComponent", ""], [1, "p-field"], [3, "for", 4, "ngIf"], ["class", "p-error", 4, "ngIf"], [3, "for"], ["aria-hidden", "true", 4, "ngIf"], ["aria-hidden", "true"], [1, "p-error"], [1, "ui-message-text", 3, "field"]],
  template: function FormlyWrapperFormField_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 1);
      ɵɵtemplate(1, FormlyWrapperFormField_label_1_Template, 3, 3, "label", 2);
      ɵɵelementContainer(2, null, 0);
      ɵɵtemplate(4, FormlyWrapperFormField_small_4_Template, 2, 1, "small", 3);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.label && ctx.props.hideLabel !== true);
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx.showError);
    }
  },
  dependencies: [FormlyValidationMessage, NgIf],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyWrapperFormField, [{
    type: Component,
    args: [{
      selector: "formly-wrapper-primeng-form-field",
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
  `
    }]
  }], null, null);
})();
var FormlyFormFieldModule = class {
};
FormlyFormFieldModule.ɵfac = function FormlyFormFieldModule_Factory(t) {
  return new (t || FormlyFormFieldModule)();
};
FormlyFormFieldModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyFormFieldModule,
  declarations: [FormlyWrapperFormField],
  imports: [CommonModule, ReactiveFormsModule, FormlyModule]
});
FormlyFormFieldModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, FormlyModule.forChild({
    wrappers: [{
      name: "form-field",
      component: FormlyWrapperFormField
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFormFieldModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyWrapperFormField],
      imports: [CommonModule, ReactiveFormsModule, FormlyModule.forChild({
        wrappers: [{
          name: "form-field",
          component: FormlyWrapperFormField
        }]
      })]
    }]
  }], null, null);
})();

export {
  FormlyFormFieldModule
};
//# sourceMappingURL=chunk-Q2FHGGEZ.js.map
