import {
  Dropdown,
  DropdownModule
} from "./chunk-32XL5YAE.js";
import "./chunk-7Z45QLAP.js";
import "./chunk-XCFDXJVE.js";
import {
  InputText,
  InputTextModule
} from "./chunk-MSI7PECP.js";
import {
  Checkbox,
  CheckboxModule
} from "./chunk-YBBA6UQY.js";
import "./chunk-DS247EWI.js";
import {
  FormlyFormFieldModule
} from "./chunk-Q2FHGGEZ.js";
import "./chunk-6EG3ZBJ7.js";
import "./chunk-NKAMF6NS.js";
import "./chunk-TD64HBFG.js";
import {
  AutoFocus,
  AutoFocusModule
} from "./chunk-5D2TY4HV.js";
import {
  FieldType,
  FormlyAttributes,
  FormlyModule
} from "./chunk-XWCM64IJ.js";
import "./chunk-J5SG2UGT.js";
import "./chunk-QJYGE52D.js";
import "./chunk-LZMSIMQG.js";
import {
  PrimeNGConfig
} from "./chunk-YELK4MPR.js";
import "./chunk-RNBP47KD.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule
} from "./chunk-W4EOIAOZ.js";
import "./chunk-54TBWI36.js";
import "./chunk-ZZIIVYJT.js";
import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle
} from "./chunk-JA6YC5PI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Injector,
  Input,
  InputFlags,
  NgModule,
  Optional,
  Output,
  Pipe,
  ViewChild,
  booleanAttribute,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-MXJMTFCA.js";
import "./chunk-Q66RP4FY.js";
import "./chunk-RQX733RD.js";
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  tap
} from "./chunk-F3BKOTLK.js";
import "./chunk-G2AA232B.js";
import "./chunk-P3H2Q3Z7.js";

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-input.mjs
function FormlyFieldInput_input_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 2);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("type", ctx_r0.props.type || "text")("formControl", ctx_r0.formControl)("formlyAttributes", ctx_r0.field);
  }
}
function FormlyFieldInput_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("formControl", ctx_r0.formControl)("formlyAttributes", ctx_r0.field);
  }
}
var FormlyFieldInput = class extends FieldType {
};
FormlyFieldInput.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldInput_BaseFactory;
  return function FormlyFieldInput_Factory(t) {
    return (ɵFormlyFieldInput_BaseFactory || (ɵFormlyFieldInput_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldInput)))(t || FormlyFieldInput);
  };
})();
FormlyFieldInput.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldInput,
  selectors: [["formly-field-primeng-input"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 2,
  consts: [["numberTmp", ""], ["pInputText", "", 3, "type", "formControl", "formlyAttributes", 4, "ngIf", "ngIfElse"], ["pInputText", "", 3, "type", "formControl", "formlyAttributes"], ["type", "number", "pInputText", "", 3, "formControl", "formlyAttributes"]],
  template: function FormlyFieldInput_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, FormlyFieldInput_input_0_Template, 1, 3, "input", 1)(1, FormlyFieldInput_ng_template_1_Template, 1, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const numberTmp_r2 = ɵɵreference(2);
      ɵɵproperty("ngIf", ctx.props.type !== "number")("ngIfElse", numberTmp_r2);
    }
  },
  dependencies: [NgIf, DefaultValueAccessor, InputText, NgControlStatus, FormControlDirective, FormlyAttributes, NumberValueAccessor],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldInput, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-input",
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
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyInputModule = class {
};
FormlyInputModule.ɵfac = function FormlyInputModule_Factory(t) {
  return new (t || FormlyInputModule)();
};
FormlyInputModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyInputModule,
  declarations: [FormlyFieldInput],
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormlyFormFieldModule, FormlyModule]
});
FormlyInputModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, InputTextModule, FormlyFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "input",
      component: FormlyFieldInput,
      wrappers: ["form-field"]
    }, {
      name: "string",
      extends: "input"
    }, {
      name: "number",
      extends: "input",
      defaultOptions: {
        props: {
          type: "number"
        }
      }
    }, {
      name: "integer",
      extends: "input",
      defaultOptions: {
        props: {
          type: "number"
        }
      }
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyInputModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldInput],
      imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormlyFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "input",
          component: FormlyFieldInput,
          wrappers: ["form-field"]
        }, {
          name: "string",
          extends: "input"
        }, {
          name: "number",
          extends: "input",
          defaultOptions: {
            props: {
              type: "number"
            }
          }
        }, {
          name: "integer",
          extends: "input",
          defaultOptions: {
            props: {
              type: "number"
            }
          }
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-inputtextarea.mjs
var InputTextarea = class _InputTextarea {
  el;
  ngModel;
  control;
  cd;
  config;
  /**
   * When present, textarea size changes as being typed.
   * @group Props
   */
  autoResize;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant = "outlined";
  /**
   * Callback to invoke on textarea resize.
   * @param {(Event | {})} event - Custom resize event.
   * @group Emits
   */
  onResize = new EventEmitter();
  filled;
  cachedScrollHeight;
  ngModelSubscription;
  ngControlSubscription;
  constructor(el, ngModel, control, cd, config) {
    this.el = el;
    this.ngModel = ngModel;
    this.control = control;
    this.cd = cd;
    this.config = config;
  }
  ngOnInit() {
    if (this.ngModel) {
      this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
    if (this.control) {
      this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
  }
  ngAfterViewInit() {
    if (this.autoResize)
      this.resize();
    this.updateFilledState();
    this.cd.detectChanges();
  }
  onInput(e) {
    this.updateState();
  }
  updateFilledState() {
    this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
  }
  resize(event) {
    this.el.nativeElement.style.height = "auto";
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = "scroll";
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = "hidden";
    }
    this.onResize.emit(event || {});
  }
  updateState() {
    this.updateFilledState();
    if (this.autoResize) {
      this.resize();
    }
  }
  ngOnDestroy() {
    if (this.ngModelSubscription) {
      this.ngModelSubscription.unsubscribe();
    }
    if (this.ngControlSubscription) {
      this.ngControlSubscription.unsubscribe();
    }
  }
  static ɵfac = function InputTextarea_Factory(t) {
    return new (t || _InputTextarea)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgModel, 8), ɵɵdirectiveInject(NgControl, 8), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(PrimeNGConfig));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _InputTextarea,
    selectors: [["", "pInputTextarea", ""]],
    hostAttrs: [1, "p-inputtextarea", "p-inputtext", "p-component", "p-element"],
    hostVars: 6,
    hostBindings: function InputTextarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function InputTextarea_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        ɵɵclassProp("p-filled", ctx.filled)("p-inputtextarea-resizable", ctx.autoResize)("p-variant-filled", ctx.variant === "filled" || ctx.config.inputStyle() === "filled");
      }
    },
    inputs: {
      autoResize: [InputFlags.HasDecoratorInputTransform, "autoResize", "autoResize", booleanAttribute],
      variant: "variant"
    },
    outputs: {
      onResize: "onResize"
    },
    features: [ɵɵInputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextarea, [{
    type: Directive,
    args: [{
      selector: "[pInputTextarea]",
      host: {
        class: "p-inputtextarea p-inputtext p-component p-element",
        "[class.p-filled]": "filled",
        "[class.p-inputtextarea-resizable]": "autoResize",
        "[class.p-variant-filled]": 'variant === "filled" || config.inputStyle() === "filled"'
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgModel,
    decorators: [{
      type: Optional
    }]
  }, {
    type: NgControl,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: PrimeNGConfig
  }], {
    autoResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    variant: [{
      type: Input
    }],
    onResize: [{
      type: Output
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var InputTextareaModule = class _InputTextareaModule {
  static ɵfac = function InputTextareaModule_Factory(t) {
    return new (t || _InputTextareaModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputTextareaModule,
    declarations: [InputTextarea],
    imports: [CommonModule],
    exports: [InputTextarea]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextareaModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [InputTextarea],
      declarations: [InputTextarea]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-textarea.mjs
var FormlyFieldTextArea = class extends FieldType {
};
FormlyFieldTextArea.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldTextArea_BaseFactory;
  return function FormlyFieldTextArea_Factory(t) {
    return (ɵFormlyFieldTextArea_BaseFactory || (ɵFormlyFieldTextArea_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldTextArea)))(t || FormlyFieldTextArea);
  };
})();
FormlyFieldTextArea.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldTextArea,
  selectors: [["formly-field-primeng-textarea"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 2,
  consts: [["pInputTextarea", "", 3, "formControl", "formlyAttributes"]],
  template: function FormlyFieldTextArea_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "textarea", 0);
    }
    if (rf & 2) {
      ɵɵproperty("formControl", ctx.formControl)("formlyAttributes", ctx.field);
    }
  },
  dependencies: [DefaultValueAccessor, InputTextarea, NgControlStatus, FormControlDirective, FormlyAttributes],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldTextArea, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-textarea",
      template: ` <textarea [formControl]="formControl" [formlyAttributes]="field" pInputTextarea></textarea> `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyTextAreaModule = class {
};
FormlyTextAreaModule.ɵfac = function FormlyTextAreaModule_Factory(t) {
  return new (t || FormlyTextAreaModule)();
};
FormlyTextAreaModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyTextAreaModule,
  declarations: [FormlyFieldTextArea],
  imports: [CommonModule, ReactiveFormsModule, InputTextareaModule, FormlyFormFieldModule, FormlyModule]
});
FormlyTextAreaModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, InputTextareaModule, FormlyFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "textarea",
      component: FormlyFieldTextArea,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyTextAreaModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldTextArea],
      imports: [CommonModule, ReactiveFormsModule, InputTextareaModule, FormlyFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "textarea",
          component: FormlyFieldTextArea,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/core/fesm2020/ngx-formly-core-select.mjs
var FormlySelectOptionsPipe = class {
  transform(options, field) {
    if (!(options instanceof Observable)) {
      options = this.observableOf(options, field);
    } else {
      this.dispose();
    }
    return options.pipe(map((value) => this.transformOptions(value, field)));
  }
  ngOnDestroy() {
    this.dispose();
  }
  transformOptions(options, field) {
    const to = this.transformSelectProps(field);
    const opts = [];
    const groups = {};
    options?.forEach((option) => {
      const o = this.transformOption(option, to);
      if (o.group) {
        const id = groups[o.label];
        if (id === void 0) {
          groups[o.label] = opts.push(o) - 1;
        } else {
          o.group.forEach((o2) => opts[id].group.push(o2));
        }
      } else {
        opts.push(o);
      }
    });
    return opts;
  }
  transformOption(option, props) {
    const group = props.groupProp(option);
    if (Array.isArray(group)) {
      return {
        label: props.labelProp(option),
        group: group.map((opt) => this.transformOption(opt, props))
      };
    }
    option = {
      label: props.labelProp(option),
      value: props.valueProp(option),
      disabled: !!props.disabledProp(option)
    };
    if (group) {
      return {
        label: group,
        group: [option]
      };
    }
    return option;
  }
  transformSelectProps(field) {
    const props = field?.props || field?.templateOptions || {};
    const selectPropFn = (prop) => typeof prop === "function" ? prop : (o) => o[prop];
    return {
      groupProp: selectPropFn(props.groupProp || "group"),
      labelProp: selectPropFn(props.labelProp || "label"),
      valueProp: selectPropFn(props.valueProp || "value"),
      disabledProp: selectPropFn(props.disabledProp || "disabled")
    };
  }
  dispose() {
    if (this._options) {
      this._options.complete();
      this._options = null;
    }
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
  observableOf(options, f) {
    this.dispose();
    if (f && f.options && f.options.fieldChanges) {
      this._subscription = f.options.fieldChanges.pipe(filter(({
        property,
        type,
        field
      }) => {
        return type === "expressionChanges" && (property.indexOf("templateOptions.options") === 0 || property.indexOf("props.options") === 0) && field === f && Array.isArray(field.props.options) && !!this._options;
      }), tap(() => this._options.next(f.props.options))).subscribe();
    }
    this._options = new BehaviorSubject(options);
    return this._options.asObservable();
  }
};
FormlySelectOptionsPipe.ɵfac = function FormlySelectOptionsPipe_Factory(t) {
  return new (t || FormlySelectOptionsPipe)();
};
FormlySelectOptionsPipe.ɵpipe = ɵɵdefinePipe({
  name: "formlySelectOptions",
  type: FormlySelectOptionsPipe,
  pure: true
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlySelectOptionsPipe, [{
    type: Pipe,
    args: [{
      name: "formlySelectOptions"
    }]
  }], null, null);
})();
var FormlySelectModule = class {
};
FormlySelectModule.ɵfac = function FormlySelectModule_Factory(t) {
  return new (t || FormlySelectModule)();
};
FormlySelectModule.ɵmod = ɵɵdefineNgModule({
  type: FormlySelectModule,
  declarations: [FormlySelectOptionsPipe],
  exports: [FormlySelectOptionsPipe]
});
FormlySelectModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlySelectModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlySelectOptionsPipe],
      exports: [FormlySelectOptionsPipe]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-radiobutton.mjs
var _c0 = ["input"];
var _c1 = (a0, a1, a2, a3) => ({
  "p-radiobutton p-component": true,
  "p-radiobutton-checked": a0,
  "p-radiobutton-disabled": a1,
  "p-radiobutton-focused": a2,
  "p-variant-filled": a3
});
var _c2 = (a0, a1, a2) => ({
  "p-radiobutton-box": true,
  "p-highlight": a0,
  "p-disabled": a1,
  "p-focus": a2
});
var _c3 = (a0, a1, a2) => ({
  "p-radiobutton-label": true,
  "p-radiobutton-label-active": a0,
  "p-disabled": a1,
  "p-radiobutton-label-focus": a2
});
function RadioButton_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 7);
    ɵɵlistener("click", function RadioButton_label_6_Template_label_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.select($event));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    const input_r2 = ɵɵreference(3);
    ɵɵclassMap(ctx_r3.labelStyleClass);
    ɵɵproperty("ngClass", ɵɵpureFunction3(6, _c3, input_r2.checked, ctx_r3.disabled, ctx_r3.focused));
    ɵɵattribute("for", ctx_r3.inputId)("data-pc-section", "label");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r3.label);
  }
}
var RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButton),
  multi: true
};
var RadioControlRegistry = class _RadioControlRegistry {
  accessors = [];
  add(control, accessor) {
    this.accessors.push([control, accessor]);
  }
  remove(accessor) {
    this.accessors = this.accessors.filter((c) => {
      return c[1] !== accessor;
    });
  }
  select(accessor) {
    this.accessors.forEach((c) => {
      if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].writeValue(accessor.value);
      }
    });
  }
  isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) {
      return false;
    }
    return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
  }
  static ɵfac = function RadioControlRegistry_Factory(t) {
    return new (t || _RadioControlRegistry)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RadioControlRegistry,
    factory: _RadioControlRegistry.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RadioButton = class _RadioButton {
  cd;
  injector;
  registry;
  config;
  /**
   * Value of the radiobutton.
   * @group Props
   */
  value;
  /**
   * The name of the form control.
   * @group Props
   */
  formControlName;
  /**
   * Name of the radiobutton group.
   * @group Props
   */
  name;
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled;
  /**
   * Label of the radiobutton.
   * @group Props
   */
  label;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant = "outlined";
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the label.
   * @group Props
   */
  labelStyleClass;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Callback to invoke on radio button click.
   * @param {RadioButtonClickEvent} event - Custom click event.
   * @group Emits
   */
  onClick = new EventEmitter();
  /**
   * Callback to invoke when the receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  inputViewChild;
  onModelChange = () => {
  };
  onModelTouched = () => {
  };
  checked;
  focused;
  control;
  constructor(cd, injector, registry, config) {
    this.cd = cd;
    this.injector = injector;
    this.registry = registry;
    this.config = config;
  }
  ngOnInit() {
    this.control = this.injector.get(NgControl);
    this.checkName();
    this.registry.add(this.control, this);
  }
  handleClick(event, radioButton, focus) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.select(event);
    if (focus) {
      radioButton.focus();
    }
  }
  select(event) {
    if (!this.disabled) {
      this.inputViewChild.nativeElement.checked = true;
      this.checked = true;
      this.onModelChange(this.value);
      this.registry.select(this);
      this.onClick.emit({
        originalEvent: event,
        value: this.value
      });
    }
  }
  writeValue(value) {
    this.checked = value == this.value;
    if (this.inputViewChild && this.inputViewChild.nativeElement) {
      this.inputViewChild.nativeElement.checked = this.checked;
    }
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }
  /**
   * Applies focus to input field.
   * @group Method
   */
  focus() {
    this.inputViewChild.nativeElement.focus();
  }
  ngOnDestroy() {
    this.registry.remove(this);
  }
  checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName) {
      this.throwNameError();
    }
    if (!this.name && this.formControlName) {
      this.name = this.formControlName;
    }
  }
  throwNameError() {
    throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
  }
  static ɵfac = function RadioButton_Factory(t) {
    return new (t || _RadioButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(RadioControlRegistry), ɵɵdirectiveInject(PrimeNGConfig));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _RadioButton,
    selectors: [["p-radioButton"]],
    viewQuery: function RadioButton_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inputViewChild = _t.first);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      value: "value",
      formControlName: "formControlName",
      name: "name",
      disabled: [InputFlags.HasDecoratorInputTransform, "disabled", "disabled", booleanAttribute],
      label: "label",
      variant: "variant",
      tabindex: [InputFlags.HasDecoratorInputTransform, "tabindex", "tabindex", numberAttribute],
      inputId: "inputId",
      ariaLabelledBy: "ariaLabelledBy",
      ariaLabel: "ariaLabel",
      style: "style",
      styleClass: "styleClass",
      labelStyleClass: "labelStyleClass",
      autofocus: [InputFlags.HasDecoratorInputTransform, "autofocus", "autofocus", booleanAttribute]
    },
    outputs: {
      onClick: "onClick",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [ɵɵProvidersFeature([RADIO_VALUE_ACCESSOR]), ɵɵInputTransformsFeature],
    decls: 7,
    vars: 31,
    consts: [["input", ""], [3, "click", "ngStyle", "ngClass"], [1, "p-hidden-accessible"], ["type", "radio", "pAutoFocus", "", 3, "focus", "blur", "checked", "disabled", "value", "autofocus"], [3, "ngClass"], [1, "p-radiobutton-icon"], [3, "class", "ngClass", "click", 4, "ngIf"], [3, "click", "ngClass"]],
    template: function RadioButton_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 1);
        ɵɵlistener("click", function RadioButton_Template_div_click_0_listener($event) {
          ɵɵrestoreView(_r1);
          const input_r2 = ɵɵreference(3);
          return ɵɵresetView(ctx.handleClick($event, input_r2, true));
        });
        ɵɵelementStart(1, "div", 2)(2, "input", 3, 0);
        ɵɵlistener("focus", function RadioButton_Template_input_focus_2_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputFocus($event));
        })("blur", function RadioButton_Template_input_blur_2_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputBlur($event));
        });
        ɵɵelementEnd()();
        ɵɵelementStart(4, "div", 4);
        ɵɵelement(5, "span", 5);
        ɵɵelementEnd()();
        ɵɵtemplate(6, RadioButton_label_6_Template, 2, 10, "label", 6);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", ɵɵpureFunction4(22, _c1, ctx.checked, ctx.disabled, ctx.focused, ctx.variant === "filled" || ctx.config.inputStyle() === "filled"));
        ɵɵattribute("data-pc-name", "radiobutton")("data-pc-section", "root");
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "hiddenInputWrapper");
        ɵɵadvance();
        ɵɵproperty("checked", ctx.checked)("disabled", ctx.disabled)("value", ctx.value)("autofocus", ctx.autofocus);
        ɵɵattribute("id", ctx.inputId)("name", ctx.name)("aria-labelledby", ctx.ariaLabelledBy)("aria-label", ctx.ariaLabel)("tabindex", ctx.tabindex)("aria-checked", ctx.checked)("data-pc-section", "hiddenInput");
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction3(27, _c2, ctx.checked, ctx.disabled, ctx.focused));
        ɵɵattribute("data-pc-section", "input");
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "icon");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.label);
      }
    },
    dependencies: [NgClass, NgIf, NgStyle, AutoFocus],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButton, [{
    type: Component,
    args: [{
      selector: "p-radioButton",
      template: `
        <div
            [ngStyle]="style"
            [ngClass]="{
                'p-radiobutton p-component': true,
                'p-radiobutton-checked': checked,
                'p-radiobutton-disabled': disabled,
                'p-radiobutton-focused': focused,
                'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled'
            }"
            [class]="styleClass"
            [attr.data-pc-name]="'radiobutton'"
            [attr.data-pc-section]="'root'"
            (click)="handleClick($event, input, true)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
                <input
                    #input
                    [attr.id]="inputId"
                    type="radio"
                    [attr.name]="name"
                    [checked]="checked"
                    [disabled]="disabled"
                    [value]="value"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.tabindex]="tabindex"
                    [attr.aria-checked]="checked"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div [ngClass]="{ 'p-radiobutton-box': true, 'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused }" [attr.data-pc-section]="'input'">
                <span class="p-radiobutton-icon" [attr.data-pc-section]="'icon'"></span>
            </div>
        </div>
        <label
            (click)="select($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-radiobutton-label': true, 'p-radiobutton-label-active': input.checked, 'p-disabled': disabled, 'p-radiobutton-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
            >{{ label }}</label
        >
    `,
      providers: [RADIO_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: Injector
  }, {
    type: RadioControlRegistry
  }, {
    type: PrimeNGConfig
  }], {
    value: [{
      type: Input
    }],
    formControlName: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    label: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    inputId: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    labelStyleClass: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onClick: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    inputViewChild: [{
      type: ViewChild,
      args: ["input"]
    }]
  });
})();
var RadioButtonModule = class _RadioButtonModule {
  static ɵfac = function RadioButtonModule_Factory(t) {
    return new (t || _RadioButtonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _RadioButtonModule,
    declarations: [RadioButton],
    imports: [CommonModule, AutoFocusModule],
    exports: [RadioButton]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, AutoFocusModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, AutoFocusModule],
      exports: [RadioButton],
      declarations: [RadioButton]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-radio.mjs
function FormlyFieldRadio_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelement(1, "p-radioButton", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("name", ctx_r1.field.name || ctx_r1.id)("formControl", option_r1.disabled ? ctx_r1.disabledControl : ctx_r1.formControl)("label", option_r1.label)("value", option_r1.value);
  }
}
var FormlyFieldRadio = class extends FieldType {
  get disabledControl() {
    return new FormControl({
      value: this.formControl.value,
      disabled: true
    });
  }
};
FormlyFieldRadio.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldRadio_BaseFactory;
  return function FormlyFieldRadio_Factory(t) {
    return (ɵFormlyFieldRadio_BaseFactory || (ɵFormlyFieldRadio_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldRadio)))(t || FormlyFieldRadio);
  };
})();
FormlyFieldRadio.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldRadio,
  selectors: [["formly-field-primeng-radio"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 6,
  consts: [["class", "p-field-radiobutton", 4, "ngFor", "ngForOf"], [1, "p-field-radiobutton"], [3, "name", "formControl", "label", "value"]],
  template: function FormlyFieldRadio_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, FormlyFieldRadio_div_0_Template, 2, 4, "div", 0);
      ɵɵpipe(1, "formlySelectOptions");
      ɵɵpipe(2, "async");
    }
    if (rf & 2) {
      ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 4, ɵɵpipeBind2(1, 1, ctx.props.options, ctx.field)));
    }
  },
  dependencies: [RadioButton, NgForOf, NgControlStatus, FormControlDirective, AsyncPipe, FormlySelectOptionsPipe],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldRadio, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-radio",
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
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyRadioModule = class {
};
FormlyRadioModule.ɵfac = function FormlyRadioModule_Factory(t) {
  return new (t || FormlyRadioModule)();
};
FormlyRadioModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyRadioModule,
  declarations: [FormlyFieldRadio],
  imports: [CommonModule, ReactiveFormsModule, RadioButtonModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule]
});
FormlyRadioModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, RadioButtonModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule.forChild({
    types: [{
      name: "radio",
      component: FormlyFieldRadio,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyRadioModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldRadio],
      imports: [CommonModule, ReactiveFormsModule, RadioButtonModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule.forChild({
        types: [{
          name: "radio",
          component: FormlyFieldRadio,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-checkbox.mjs
var FormlyFieldCheckbox = class extends FieldType {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      props: {
        hideLabel: true
      }
    };
  }
};
FormlyFieldCheckbox.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldCheckbox_BaseFactory;
  return function FormlyFieldCheckbox_Factory(t) {
    return (ɵFormlyFieldCheckbox_BaseFactory || (ɵFormlyFieldCheckbox_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldCheckbox)))(t || FormlyFieldCheckbox);
  };
})();
FormlyFieldCheckbox.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldCheckbox,
  selectors: [["formly-field-primeng-checkbox"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 2,
  vars: 4,
  consts: [[1, "p-field-checkbox"], [3, "onChange", "binary", "label", "formControl", "formlyAttributes"]],
  template: function FormlyFieldCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "p-checkbox", 1);
      ɵɵlistener("onChange", function FormlyFieldCheckbox_Template_p_checkbox_onChange_1_listener($event) {
        return ctx.props.change && ctx.props.change(ctx.field, $event);
      });
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("binary", true)("label", ctx.props.label)("formControl", ctx.formControl)("formlyAttributes", ctx.field);
    }
  },
  dependencies: [Checkbox, NgControlStatus, FormControlDirective, FormlyAttributes],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldCheckbox, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-checkbox",
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
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyCheckboxModule = class {
};
FormlyCheckboxModule.ɵfac = function FormlyCheckboxModule_Factory(t) {
  return new (t || FormlyCheckboxModule)();
};
FormlyCheckboxModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyCheckboxModule,
  declarations: [FormlyFieldCheckbox],
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule, FormlyFormFieldModule, FormlyModule]
});
FormlyCheckboxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, CheckboxModule, FormlyFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "checkbox",
      component: FormlyFieldCheckbox,
      wrappers: ["form-field"]
    }, {
      name: "boolean",
      extends: "checkbox"
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyCheckboxModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldCheckbox],
      imports: [CommonModule, ReactiveFormsModule, CheckboxModule, FormlyFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "checkbox",
          component: FormlyFieldCheckbox,
          wrappers: ["form-field"]
        }, {
          name: "boolean",
          extends: "checkbox"
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng-select.mjs
var FormlyFieldSelect = class extends FieldType {
};
FormlyFieldSelect.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldSelect_BaseFactory;
  return function FormlyFieldSelect_Factory(t) {
    return (ɵFormlyFieldSelect_BaseFactory || (ɵFormlyFieldSelect_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldSelect)))(t || FormlyFieldSelect);
  };
})();
FormlyFieldSelect.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldSelect,
  selectors: [["formly-field-primeng-select"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 11,
  consts: [[3, "onChange", "placeholder", "options", "formControl", "formlyAttributes", "showClear", "appendTo"]],
  template: function FormlyFieldSelect_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "p-dropdown", 0);
      ɵɵpipe(1, "formlySelectOptions");
      ɵɵpipe(2, "async");
      ɵɵlistener("onChange", function FormlyFieldSelect_Template_p_dropdown_onChange_0_listener($event) {
        return ctx.props.change && ctx.props.change(ctx.field, $event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("placeholder", ctx.props.placeholder)("options", ɵɵpipeBind1(2, 9, ɵɵpipeBind2(1, 6, ctx.props.options, ctx.field)))("formControl", ctx.formControl)("formlyAttributes", ctx.field)("showClear", !ctx.props.required)("appendTo", ctx.props.appendTo);
    }
  },
  dependencies: [Dropdown, NgControlStatus, FormControlDirective, FormlyAttributes, AsyncPipe, FormlySelectOptionsPipe],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldSelect, [{
    type: Component,
    args: [{
      selector: "formly-field-primeng-select",
      template: `
    <p-dropdown
      [placeholder]="props.placeholder"
      [options]="props.options | formlySelectOptions : field | async"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [showClear]="!props.required"
      [appendTo]="props.appendTo"
      (onChange)="props.change && props.change(field, $event)"
    >
    </p-dropdown>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlySelectModule2 = class {
};
FormlySelectModule2.ɵfac = function FormlySelectModule_Factory2(t) {
  return new (t || FormlySelectModule2)();
};
FormlySelectModule2.ɵmod = ɵɵdefineNgModule({
  type: FormlySelectModule2,
  declarations: [FormlyFieldSelect],
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule]
});
FormlySelectModule2.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, DropdownModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule.forChild({
    types: [{
      name: "select",
      component: FormlyFieldSelect,
      wrappers: ["form-field"]
    }, {
      name: "enum",
      extends: "select"
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlySelectModule2, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldSelect],
      imports: [CommonModule, ReactiveFormsModule, DropdownModule, FormlyFormFieldModule, FormlySelectModule, FormlyModule.forChild({
        types: [{
          name: "select",
          component: FormlyFieldSelect,
          wrappers: ["form-field"]
        }, {
          name: "enum",
          extends: "select"
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/primeng/fesm2020/ngx-formly-primeng.mjs
var FormlyPrimeNGModule = class {
};
FormlyPrimeNGModule.ɵfac = function FormlyPrimeNGModule_Factory(t) {
  return new (t || FormlyPrimeNGModule)();
};
FormlyPrimeNGModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyPrimeNGModule,
  imports: [FormlyFormFieldModule, FormlyInputModule, FormlyTextAreaModule, FormlyRadioModule, FormlyCheckboxModule, FormlySelectModule2]
});
FormlyPrimeNGModule.ɵinj = ɵɵdefineInjector({
  imports: [[FormlyFormFieldModule, FormlyInputModule, FormlyTextAreaModule, FormlyRadioModule, FormlyCheckboxModule, FormlySelectModule2]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyPrimeNGModule, [{
    type: NgModule,
    args: [{
      imports: [FormlyFormFieldModule, FormlyInputModule, FormlyTextAreaModule, FormlyRadioModule, FormlyCheckboxModule, FormlySelectModule2]
    }]
  }], null, null);
})();
export {
  FormlyPrimeNGModule
};
//# sourceMappingURL=@ngx-formly_primeng.js.map
