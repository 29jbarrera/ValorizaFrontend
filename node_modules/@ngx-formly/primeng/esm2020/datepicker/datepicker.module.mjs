import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FormlyFormFieldModule } from '@ngx-formly/primeng/form-field';
import { FormlyFieldDatepicker } from './datepicker.type';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyDatepickerModule {
}
FormlyDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyDatepickerModule, declarations: [FormlyFieldDatepicker], imports: [CommonModule,
        ReactiveFormsModule,
        CalendarModule,
        FormlyFormFieldModule, i1.FormlyModule] });
FormlyDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyDatepickerModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            CalendarModule,
            FormlyFormFieldModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'datepicker',
                        component: FormlyFieldDatepicker,
                        wrappers: ['form-field'],
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyFieldDatepicker],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CalendarModule,
                        FormlyFormFieldModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'datepicker',
                                    component: FormlyFieldDatepicker,
                                    wrappers: ['form-field'],
                                },
                            ],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvcHJpbWVuZy9kYXRlcGlja2VyL3NyYy9kYXRlcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFxQjFELE1BQU0sT0FBTyxzQkFBc0I7O29IQUF0QixzQkFBc0I7cUhBQXRCLHNCQUFzQixpQkFsQmxCLHFCQUFxQixhQUVsQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGNBQWM7UUFFZCxxQkFBcUI7cUhBWVosc0JBQXNCLFlBakJ4QjtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsY0FBYztZQUVkLHFCQUFxQjtZQUNyQixZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNwQixLQUFLLEVBQUU7b0JBQ0w7d0JBQ0UsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLFNBQVMsRUFBRSxxQkFBcUI7d0JBQ2hDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRixDQUFDO1NBQ0g7NEZBRVUsc0JBQXNCO2tCQW5CbEMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDckMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixjQUFjO3dCQUVkLHFCQUFxQjt3QkFDckIsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEIsS0FBSyxFQUFFO2dDQUNMO29DQUNFLElBQUksRUFBRSxZQUFZO29DQUNsQixTQUFTLEVBQUUscUJBQXFCO29DQUNoQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUNBQ3pCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1seU1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhbGVuZGFyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jYWxlbmRhcic7XG5pbXBvcnQgeyBGb3JtbHlGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9wcmltZW5nL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGREYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLnR5cGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtGb3JtbHlGaWVsZERhdGVwaWNrZXJdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ2FsZW5kYXJNb2R1bGUsXG5cbiAgICBGb3JtbHlGb3JtRmllbGRNb2R1bGUsXG4gICAgRm9ybWx5TW9kdWxlLmZvckNoaWxkKHtcbiAgICAgIHR5cGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZGF0ZXBpY2tlcicsXG4gICAgICAgICAgY29tcG9uZW50OiBGb3JtbHlGaWVsZERhdGVwaWNrZXIsXG4gICAgICAgICAgd3JhcHBlcnM6IFsnZm9ybS1maWVsZCddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGF0ZXBpY2tlck1vZHVsZSB7fVxuIl19