import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    if(!img) {
      return url + '/usuarios/xd'
    }

    if(img.indexOf('https') >= 0) {
      return img;
    }

    switch(tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'darwinCore':
        url += '/darwinCores/' + img;
        break;
      
      default:
        console.log('El tipo de imagen ingresado no existe. Tipos válidos: usuarios, darwinCores.');
        url += '/usuarios/xd';
    }
    
    return url;
  }

}