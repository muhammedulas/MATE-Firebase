import { Pipe, PipeTransform } from '@angular/core';
import { teamModel } from './models/teamModel';

@Pipe({
  name: 'depFilter'
})
export class DepFilterPipe implements PipeTransform {

  transform(teamList: teamModel[], dep_key?: string): teamModel[] {
    if (!teamList||!dep_key) {
      return teamList.filter(t=> t.relatedDepartment=="")
    }
    else {
      return teamList.filter(t => t.relatedDepartment.includes(dep_key))
    }
  }
}
