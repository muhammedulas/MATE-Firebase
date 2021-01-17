import { Pipe, PipeTransform } from '@angular/core';
import { userModel } from './models/userModel';

@Pipe({
  name: 'filterByTeam'
})
export class FilterByTeamPipe implements PipeTransform {

  transform(usersList: userModel[], team_key?: string): userModel[] {
    if (!usersList||!team_key) {
      return usersList.filter(t=> t.team_key=="")
    }
    else {
      return usersList.filter(t => t.team_key.includes(team_key))
    }
  }
}
