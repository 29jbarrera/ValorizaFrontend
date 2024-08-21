import { Component } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-horometros-kilometros-form',
  standalone: true,
  imports: [
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    TreeSelectModule,
    DropdownModule
  ],
  templateUrl: './horometros-kilometros-form.component.html',
  styleUrl: './horometros-kilometros-form.component.scss',
})
export class HorometrosKilometrosFormComponent {
nodes: []|undefined;
}
