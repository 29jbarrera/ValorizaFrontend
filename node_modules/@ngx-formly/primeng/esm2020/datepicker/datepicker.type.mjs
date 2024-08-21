import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "primeng/calendar";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldDatepicker extends FieldType {
}
FormlyFieldDatepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldDatepicker, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldDatepicker.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldDatepicker, selector: "formly-field-primeng-datepicker", usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i1.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "view", "defaultDate", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-primeng-datepicker',
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
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL3ByaW1lbmcvZGF0ZXBpY2tlci9zcmMvZGF0ZXBpY2tlci50eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBc0MsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFzRGpGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxTQUEyQzs7bUhBQXpFLHFCQUFxQjt1R0FBckIscUJBQXFCLDhGQTFCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUOzRGQUdVLHFCQUFxQjtrQkE1QmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9wcmltZW5nL2Zvcm0tZmllbGQnO1xuXG5pbnRlcmZhY2UgRGF0ZXBpY2tlclByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGRlZmF1bHREYXRlPzogRGF0ZTtcbiAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgaG91ckZvcm1hdD86IHN0cmluZztcbiAgc2hvd1RpbWU/OiBib29sZWFuO1xuICBzaG93SWNvbj86IGJvb2xlYW47XG4gIHNob3dCdXR0b25CYXI/OiBib29sZWFuO1xuICBzaG93T3RoZXJNb250aHM/OiBib29sZWFuO1xuICBzZWxlY3RPdGhlck1vbnRocz86IGJvb2xlYW47XG4gIHNlbGVjdGlvbk1vZGU/OiBzdHJpbmc7XG4gIG51bWJlck9mTW9udGhzPzogbnVtYmVyO1xuICBpbmxpbmU/OiBib29sZWFuO1xuICByZWFkb25seUlucHV0PzogYm9vbGVhbjtcbiAgdG91Y2hVST86IGJvb2xlYW47XG4gIG1vbnRoTmF2aWdhdG9yPzogYm9vbGVhbjtcbiAgeWVhck5hdmlnYXRvcj86IGJvb2xlYW47XG4gIHllYXJSYW5nZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlEYXRlcGlja2VyRmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxEYXRlcGlja2VyUHJvcHM+IHtcbiAgdHlwZTogJ2RhdGVwaWNrZXInIHwgVHlwZTxGb3JtbHlGaWVsZERhdGVwaWNrZXI+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtcHJpbWVuZy1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cC1jYWxlbmRhclxuICAgICAgW2RlZmF1bHREYXRlXT1cInByb3BzLmRlZmF1bHREYXRlXCJcbiAgICAgIFtkYXRlRm9ybWF0XT1cInByb3BzLmRhdGVGb3JtYXRcIlxuICAgICAgW2hvdXJGb3JtYXRdPVwicHJvcHMuaG91ckZvcm1hdFwiXG4gICAgICBbc2hvd1RpbWVdPVwicHJvcHMuc2hvd1RpbWVcIlxuICAgICAgW3Nob3dJY29uXT1cInByb3BzLnNob3dJY29uXCJcbiAgICAgIFtzaG93QnV0dG9uQmFyXT1cInByb3BzLnNob3dCdXR0b25CYXJcIlxuICAgICAgW3Nob3dPdGhlck1vbnRoc109XCJwcm9wcy5zaG93T3RoZXJNb250aHNcIlxuICAgICAgW3NlbGVjdE90aGVyTW9udGhzXT1cInByb3BzLnNlbGVjdE90aGVyTW9udGhzXCJcbiAgICAgIFtzZWxlY3Rpb25Nb2RlXT1cInByb3BzLnNlbGVjdGlvbk1vZGUgfHwgJ3NpbmdsZSdcIlxuICAgICAgW251bWJlck9mTW9udGhzXT1cInByb3BzLm51bWJlck9mTW9udGhzXCJcbiAgICAgIFtpbmxpbmVdPVwicHJvcHMuaW5saW5lXCJcbiAgICAgIFtyZWFkb25seUlucHV0XT1cInByb3BzLnJlYWRvbmx5SW5wdXRcIlxuICAgICAgW3RvdWNoVUldPVwicHJvcHMudG91Y2hVSVwiXG4gICAgICBbbW9udGhOYXZpZ2F0b3JdPVwicHJvcHMubW9udGhOYXZpZ2F0b3JcIlxuICAgICAgW3llYXJOYXZpZ2F0b3JdPVwicHJvcHMueWVhck5hdmlnYXRvclwiXG4gICAgICBbeWVhclJhbmdlXT1cInByb3BzLnllYXJSYW5nZVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicHJvcHMucGxhY2Vob2xkZXJcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICA+XG4gICAgPC9wLWNhbGVuZGFyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGREYXRlcGlja2VyIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxEYXRlcGlja2VyUHJvcHM+PiB7fVxuIl19