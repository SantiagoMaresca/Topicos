import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue): any {
    console.log(searchValue.user);
    if (searchValue=='') return value;
    return value.filter((v) => v.user.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.badge.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}