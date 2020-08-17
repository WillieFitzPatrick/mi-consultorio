import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sino'
})
export class SinoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? 'Si' : 'No';
  }

}