import { Component } from '@angular/core';
import { MapService } from '../../map.service';
import { IngestionsComponent } from '../ingestions/ingestions.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [IngestionsComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap();
  }

}
