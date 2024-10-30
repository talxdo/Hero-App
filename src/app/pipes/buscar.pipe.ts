import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '@interfaces/Hero';

@Pipe({
  name: 'buscar',
  standalone: true
})
export class BuscarPipe implements PipeTransform {

  transform(Listado: Hero[], valor: string, criterio : string): Hero[] {
    
    if(!criterio){
      return Listado;
    }
    valor = valor.toLocaleLowerCase();
    switch (criterio) {
        case 'nombre':
            return Listado.filter(l => l.nombre.toLocaleLowerCase().includes(valor));
        case 'editorial':
            return Listado.filter(l => l.editorial.toLocaleLowerCase().includes(valor));
        case 'poderes':
            return Listado.filter(l => l.poderes.some(poder => poder.toLocaleLowerCase().includes(valor)));
        default:
            return Listado;
    }
  }
}
