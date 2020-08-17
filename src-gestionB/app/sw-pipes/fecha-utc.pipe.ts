import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaUtc'
})
export class FechaUtcPipe implements PipeTransform {

  transform(value: Date, args?: any): Date | string {
	  if (value) {

      var d = new Date(value);        
        //return d.toLocaleDateString("es-AR") +' '+ d.toLocaleTimeString("es-AR");
        
      var newDate = new Date(d.getTime()+d.getTimezoneOffset()*60*1000);

      var offset = d.getTimezoneOffset() / 60;
      var hours = d.getHours();

      newDate.setHours(hours - offset);

      return newDate; 

	  }
	  return '';
  }

}
