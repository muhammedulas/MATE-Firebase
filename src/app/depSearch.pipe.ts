import { Pipe, PipeTransform } from '@angular/core';
import { departmentModel } from './models/departmentModel';

@Pipe({
  name: 'depSearch'
})
export class DepSearchPipe implements PipeTransform {

  transform(deps:departmentModel[],searchValue:string): departmentModel[] {
    if( !departmentModel || !searchValue ){
      return deps
    }
    else{
      return deps.filter(dep=>
        dep.department_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
        dep.department_def.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        )
    }
  }

}
