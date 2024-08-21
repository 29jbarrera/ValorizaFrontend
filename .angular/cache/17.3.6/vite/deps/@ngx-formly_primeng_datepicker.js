import {
  Calendar,
  CalendarModule
} from "./chunk-DSGKDZ6M.js";
import "./chunk-TIH66B5I.js";
import "./chunk-EIVJ3GNO.js";
import {
  FormlyFormFieldModule
} from "./chunk-Q2FHGGEZ.js";
import "./chunk-6EG3ZBJ7.js";
import "./chunk-NKAMF6NS.js";
import "./chunk-TD64HBFG.js";
import "./chunk-5D2TY4HV.js";
import {
  FieldType,
  FormlyAttributes,
  FormlyModule
} from "./chunk-XWCM64IJ.js";
import "./chunk-LKAXEE2X.js";
import "./chunk-J5SG2UGT.js";
import "./chunk-QJYGE52D.js";
import "./chunk-LZMSIMQG.js";
import "./chunk-YELK4MPR.js";
import "./chunk-RNBP47KD.js";
import {
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-W4EOIAOZ.js";
import "./chunk-54TBWI36.js";
import "./chunk-ZZIIVYJT.js";
import {
  CommonModule
} from "./chunk-JA6YC5PI.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵgetInheritedFactory,
  ɵɵproperty
} from "./chunk-MXJMTFCA.js";
import "./chunk-Q66RP4FY.js";
import "./chunk-RQX733RD.js";
import "./chunk-F3BKOTLK.js";
import "./chunk-G2AA232B.js";
import "./chunk-P3H2Q3Z7.js";

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-datepicker.mjs
var FormlyFieldDatepicker = class extends FieldType {
};
FormlyFieldDatepicker.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldDatepicker_BaseFactory;
  return function FormlyFieldDatepicker_Factory(t) {
    return (ɵFormlyFieldDatepicker_BaseFactory || (ɵFormlyFieldDatepicker_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldDatepicker)))(t || FormlyFieldDatepicker);
  };
})();
FormlyFieldDatepicker.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldDatepicker,
  selectors: [["formly-field-primeng-datepicker"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 19,
  consts: [[3, "defaultDate", "dateFormat", "hourFormat", "showTime", "showIcon", "showButtonBar", "showOtherMonths", "selectOtherMonths", "selectionMode", "numberOfMonths", "inline", "readonlyInput", "touchUI", "monthNavigator", "yearNavigator", "yearRange", "placeholder", "formControl", "formlyAttributes"]],
  template: function FormlyFieldDatepicker_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "p-calendar", 0);
    }
    if (rf & 2) {
      ɵɵproperty("defaultDate", ctx.props.defaultDate)("dateFormat", ctx.props.dateFormat)("hourFormat", ctx.props.hourFormat)("showTime", ctx.props.showTime)("showIcon", ctx.props.showIcon)("showButtonBar", ctx.props.showButtonBar)("showOtherMonths", ctx.props.showOtherMonths)("selectOtherMonths", ctx.props.selectOtherMonths)("selectionMode", ctx.props.selectionMode || "single")("numberOfMonths", ctx.props.numberOfMonths)("inline", ctx.props.inline)("readonlyInput", ctx.props.readonlyInput)("touchUI", ctx.props.touchUI)("monthNavigator", ctx.props.monthNavigator)("yearNavigator", ctx.props.yearNavigator)("yearRange", ctx.props.yearRange)("placeholder", ctx.props.placeholder)("formControl", ctx.formControl)("formlyAttributes", ctx.field);
    }
  },
  dependencies: [Calendar, NgControlStatus, FormControlDirective, FormlyAttributes],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldDatepicker, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-datepicker",
      template: `
    <p-calendar
      [defaultDate]="props.defaultDate"
      [dateFormat]="props.dateFormat"
      [hourFormat]="props.hourFormat"
      [showTime]="props.showTime"
      [showIcon]="props.showIcon"
      [showButtonBar]="props.showButtonBar"
      [showOtherMonths]="props.showOtherMonths"
      [selectOtherMonths]="props.selectOtherMonths"
      [selectionMode]="props.selectionMode || 'single'"
      [numberOfMonths]="props.numberOfMonths"
      [inline]="props.inline"
      [readonlyInput]="props.readonlyInput"
      [touchUI]="props.touchUI"
      [monthNavigator]="props.monthNavigator"
      [yearNavigator]="props.yearNavigator"
      [yearRange]="props.yearRange"
      [placeholder]="props.placeholder"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
    </p-calendar>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyDatepickerModule = class {
};
FormlyDatepickerModule.ɵfac = function FormlyDatepickerModule_Factory(t) {
  return new (t || FormlyDatepickerModule)();
};
FormlyDatepickerModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyDatepickerModule,
  declarations: [FormlyFieldDatepicker],
  imports: [CommonModule, ReactiveFormsModule, CalendarModule, FormlyFormFieldModule, FormlyModule]
});
FormlyDatepickerModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, CalendarModule, FormlyFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "datepicker",
      component: FormlyFieldDatepicker,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyDatepickerModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldDatepicker],
      imports: [CommonModule, ReactiveFormsModule, CalendarModule, FormlyFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "datepicker",
          component: FormlyFieldDatepicker,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();
var FormlyDatePickerModule = FormlyDatepickerModule;
export {
  FormlyDatePickerModule,
  FormlyDatepickerModule
};
//# sourceMappingURL=@ngx-formly_primeng_datepicker.js.map
