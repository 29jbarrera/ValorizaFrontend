import { Injectable, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defineHiddenProp, observe, disableTreeValidityCall } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "./formly.config";
import * as i2 from "@angular/forms";
export class FormlyFormBuilder {
    constructor(config, injector, viewContainerRef, parentForm) {
        this.config = config;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
    }
    buildForm(form, fieldGroup = [], model, options) {
        this.build({ fieldGroup, model, form, options });
    }
    build(field) {
        if (!this.config.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        if (!field.parent) {
            this._setOptions(field);
        }
        disableTreeValidityCall(field.form, () => {
            this._build(field);
            if (!field.parent) {
                const options = field.options;
                options.checkExpressions?.(field, true);
                options._detectChanges?.(field);
            }
        });
    }
    _build(field) {
        if (!field) {
            return;
        }
        const extensions = Object.values(this.config.extensions);
        extensions.forEach((extension) => extension.prePopulate?.(field));
        extensions.forEach((extension) => extension.onPopulate?.(field));
        field.fieldGroup?.forEach((f) => this._build(f));
        extensions.forEach((extension) => extension.postPopulate?.(field));
    }
    _setOptions(field) {
        field.form = field.form || new FormGroup({});
        field.model = field.model || {};
        field.options = field.options || {};
        const options = field.options;
        if (!options._viewContainerRef) {
            defineHiddenProp(options, '_viewContainerRef', this.viewContainerRef);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options.build) {
            options._buildForm = () => {
                console.warn(`Formly: 'options._buildForm' is deprecated since v6.0, use 'options.build' instead.`);
                this.build(field);
            };
            options.build = (f = field) => {
                this.build(f);
                return f;
            };
        }
        if (!options.parentForm && this.parentForm) {
            defineHiddenProp(options, 'parentForm', this.parentForm);
            observe(options, ['parentForm', 'submitted'], ({ firstChange }) => {
                if (!firstChange) {
                    options.detectChanges(field);
                }
            });
        }
    }
}
FormlyFormBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, deps: [{ token: i1.FormlyConfig }, { token: i0.Injector }, { token: i0.ViewContainerRef, optional: true }, { token: i2.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFormBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: i0.Injector }, { type: i0.ViewContainerRef, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL3NlcnZpY2VzL2Zvcm1seS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksUUFBUSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsU0FBUyxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBRzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFHOUUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNVLE1BQW9CLEVBQ3BCLFFBQWtCLEVBQ04sZ0JBQWtDLEVBQ2xDLFVBQThCO1FBSDFDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNOLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7SUFDakQsQ0FBQztJQUVKLFNBQVMsQ0FBQyxJQUEyQixFQUFFLGFBQWtDLEVBQUUsRUFBRSxLQUFVLEVBQUUsT0FBMEI7UUFDakgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUF3QjtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkZBQTJGLENBQUMsQ0FBQztTQUM5RztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFFRCx1QkFBdUIsQ0FBQyxLQUFLLENBQUMs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RSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNoQixPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM5QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzsrR0E5RVUsaUJBQWlCO21IQUFqQixpQkFBaUIsY0FESixNQUFNOzRGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFLN0IsUUFBUTs7MEJBQ1IsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5Rm9ybU9wdGlvbnMsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgZGVmaW5lSGlkZGVuUHJvcCwgb2JzZXJ2ZSwgZGlzYWJsZVRyZWVWYWxpZGl0eUNhbGwgfSBmcm9tICcuLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Rm9ybUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudEZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgKSB7fVxuXG4gIGJ1aWxkRm9ybShmb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXksIGZpZWxkR3JvdXA6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXSwgbW9kZWw6IGFueSwgb3B0aW9uczogRm9ybWx5Rm9ybU9wdGlvbnMpIHtcbiAgICB0aGlzLmJ1aWxkKHsgZmllbGRHcm91cCwgbW9kZWwsIGZvcm0sIG9wdGlvbnMgfSk7XG4gIH1cblxuICBidWlsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmV4dGVuc2lvbnMuY29yZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZ3hGb3JtbHk6IG1pc3NpbmcgYGZvclJvb3QoKWAgY2FsbC4gdXNlIGBmb3JSb290KClgIHdoZW4gcmVnaXN0ZXJpbmcgdGhlIGBGb3JtbHlNb2R1bGVgLicpO1xuICAgIH1cblxuICAgIGlmICghZmllbGQucGFyZW50KSB7XG4gICAgICB0aGlzLl9zZXRPcHRpb25zKGZpZWxkKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlVHJlZVZhbGlkaXR5Q2FsbChmaWVsZC5mb3JtLCAoKSA9PiB7XG4gICAgICB0aGlzLl9idWlsZChmaWVsZCk7XG4gICAgICBpZiAoIWZpZWxkLnBhcmVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gKGZpZWxkIGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpLm9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMuY2hlY2tFeHByZXNzaW9ucz8uKGZpZWxkLCB0cnVlKTtcbiAgICAgICAgb3B0aW9ucy5fZGV0ZWN0Q2hhbmdlcz8uKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCFmaWVsZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuY29uZmlnLmV4dGVuc2lvbnMpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ucHJlUG9wdWxhdGU/LihmaWVsZCkpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ub25Qb3B1bGF0ZT8uKGZpZWxkKSk7XG4gICAgZmllbGQuZmllbGRHcm91cD8uZm9yRWFjaCgoZikgPT4gdGhpcy5fYnVpbGQoZikpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ucG9zdFBvcHVsYXRlPy4oZmllbGQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE9wdGlvbnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBmaWVsZC5mb3JtID0gZmllbGQuZm9ybSB8fCBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmaWVsZC5tb2RlbCA9IGZpZWxkLm1vZGVsIHx8IHt9O1xuICAgIGZpZWxkLm9wdGlvbnMgPSBmaWVsZC5vcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSBmaWVsZC5vcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zLl92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdfdmlld0NvbnRhaW5lclJlZicsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9pbmplY3Rvcikge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChvcHRpb25zLCAnX2luamVjdG9yJywgdGhpcy5pbmplY3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmJ1aWxkKSB7XG4gICAgICBvcHRpb25zLl9idWlsZEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybihgRm9ybWx5OiAnb3B0aW9ucy5fYnVpbGRGb3JtJyBpcyBkZXByZWNhdGVkIHNpbmNlIHY2LjAsIHVzZSAnb3B0aW9ucy5idWlsZCcgaW5zdGVhZC5gKTtcbiAgICAgICAgdGhpcy5idWlsZChmaWVsZCk7XG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zLmJ1aWxkID0gKGY6IEZvcm1seUZpZWxkQ29uZmlnID0gZmllbGQpID0+IHtcbiAgICAgICAgdGhpcy5idWlsZChmKTtcblxuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnBhcmVudEZvcm0gJiYgdGhpcy5wYXJlbnRGb3JtKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdwYXJlbnRGb3JtJywgdGhpcy5wYXJlbnRGb3JtKTtcbiAgICAgIG9ic2VydmUob3B0aW9ucywgWydwYXJlbnRGb3JtJywgJ3N1Ym1pdHRlZCddLCAoeyBmaXJzdENoYW5nZSB9KSA9PiB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICBvcHRpb25zLmRldGVjdENoYW5nZXMoZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==