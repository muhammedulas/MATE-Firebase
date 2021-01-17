import { Pipe, PipeTransform } from '@angular/core';
import { taskModel } from './models/taskModel';

@Pipe({
  name: 'taskSearch'
})
export class TaskSearchPipe implements PipeTransform {

  transform(taskList: taskModel[], searchValue: string): taskModel[] {
    if (!taskList || !searchValue) return taskList
    else {
      return taskList.filter(task => task.header.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        task.assignedBy_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        task.assignedTo_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        task.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        task.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        task.result.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    }
  }

}
