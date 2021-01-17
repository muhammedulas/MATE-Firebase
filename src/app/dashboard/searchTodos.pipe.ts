import { Pipe, PipeTransform } from '@angular/core';
import { personalTaskModel } from '../models/personelTaskModel';

@Pipe({
  name: 'searchTodos'
})
export class SearchTodosPipe implements PipeTransform {

  transform(value: personalTaskModel[], searchVal: string): personalTaskModel[] {
    if(!value||!searchVal){
      return value
    }
    else{
      return value.filter(item=> item.description.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()))
    }
  }

}
