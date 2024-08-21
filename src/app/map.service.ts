import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map | undefined;
  style = `mapbox://styles/salbatore/clvyf6s5i014101pc7qwy34a7`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 40.4167754;
  lng = -3.7037902;
  zoom = 11;
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken =
      'pk.eyJ1Ijoic2FsYmF0b3JlIiwiYSI6ImNsdnk0c2d4ajA3djcyanF5dTY0NmRjM2MifQ.VFHy8cuuf2OLxMLPiUko5w';
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      pitch: 55,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl(),'top-right');

    this.map.on('load', () => {
      var points: any = {
        type: 'FeatureCollection',
        features: [],
      };
      for (let i = 0; i < 200; i++) {
        const longitude = -3.7037902 + (Math.random() - 0.5) * 0.1;
        const latitude = 40.4167754 + (Math.random() - 0.5) * 0.1;
        points.features.push({
          type: 'Feature',
          
          geometry: {
            type: 'Point',
            
            coordinates: [longitude, latitude],
          },
        } );
      }

      this.map?.addSource('random-points', {
        type: 'geojson',
        data: points,
      } as any);

      this.map?.addLayer({
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'random-points',
        paint: {
          // Aumentar el peso de los puntos para que el heatmap sea más visible
          'heatmap-weight': 2,
          // Intensidad del calor en los puntos de datos
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            9,
            42,
          ],
          // Colores del heatmap
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
           
            0.8,
            'rgba(0,0,0,0.8)',
            0.9,
            'rgb(59, 173, 45)',
            1,
            'rgba(0,0,0,0.8)',
          ],
          // Radio de los puntos del heatmap
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 30],
          // Opacidad del heatmap en diferentes zooms
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            1,
            9,
            0.9,
          ],
        },
      });

      this.map?.addLayer({
        id: 'heatmap-layer2',
        type: 'circle',
        source: 'random-points',
        paint: {
          'circle-radius': 2,
          'circle-color': 'rgb(59, 173, 45)',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 0,
        },
      });

      this.map?.addLayer({
        id: 'heatmap-layer22',
        type: 'circle',
        source: 'random-points',
        paint: {
          'circle-radius': 15,
          'circle-color': 'transparent',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 0.1,
        },
      });

     
    });
  }
}
