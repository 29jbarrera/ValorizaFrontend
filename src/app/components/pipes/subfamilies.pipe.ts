import { Pipe, PipeTransform } from '@angular/core';
import { SubFamiliaDto } from '@valoriza/web-commons';
import { stringOneIncludeInStringTwo,  get_lang_description, LANG_ES } from '@valoriza/web-components';

@Pipe({
  name: 'filterSubfamilies',
  standalone: true,
})
export class FilterSubfamilies implements PipeTransform {
  transform(subfamilies: SubFamiliaDto[], searchTerm: string): SubFamiliaDto[] {
    if (!subfamilies) return [];

    if (!searchTerm) return subfamilies;

    return subfamilies.filter((subfamily: SubFamiliaDto) => {
      const descripcion = get_description_subfamily(subfamily)
      const matchDescripcion = stringOneIncludeInStringTwo(searchTerm, descripcion)
    
      return matchDescripcion
    });
  }
}


function get_description_subfamily(subfamily: SubFamiliaDto): string {
  return get_lang_description(subfamily.langs!, LANG_ES);
}