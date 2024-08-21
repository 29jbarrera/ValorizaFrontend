import { Pipe, PipeTransform } from '@angular/core';
import { Gruas } from '../pages/machines/gruas/type';

@Pipe({
  name: 'filtrogruas',
  standalone: true
})
export class FiltrogruasPipe implements PipeTransform {

  transform(gruas: Gruas[] | undefined, filtros: any): Gruas[] | undefined {
    if (!gruas || !filtros) {
      return gruas; // Si no hay datos o filtros, devolver los datos sin cambios
    }

    return gruas.filter(grua => {
      const centroMinusculas = grua.centro.toLowerCase();
      const filtroCentroMinusculas = filtros.centro.toLowerCase();
      return centroMinusculas.includes(filtroCentroMinusculas);
      // Aquí puedes agregar más lógica para aplicar otros filtros si es necesario
    });
  }


}
