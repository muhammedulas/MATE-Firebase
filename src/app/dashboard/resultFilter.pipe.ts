import { Pipe, PipeTransform } from '@angular/core';
import { taskModel } from '../models/taskModel';

@Pipe({
  name: 'resultFilter'
})
export class ResultFilterPipe implements PipeTransform {

  transform(taskList:taskModel[], requestedType?: any): taskModel[] {
    if(!taskList||!requestedType){
      return taskList
    }
    else{
      return taskList.filter(task=>task.result.includes(requestedType))
    }
  }

}
