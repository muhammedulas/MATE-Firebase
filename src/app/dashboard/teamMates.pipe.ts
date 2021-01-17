import { Pipe, PipeTransform } from '@angular/core';
import { userModel } from '../models/userModel';

@Pipe({
  name: 'teamMates'
})
export class TeamMatesPipe implements PipeTransform {

  transform(userList:userModel[],team_key): userModel[]{
    return userList.filter(user=>{
      user.team_name.toLocaleLowerCase().includes(localStorage.getItem('teamName').toLocaleLowerCase())
    })
  }

}
