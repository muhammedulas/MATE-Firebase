import { Pipe, PipeTransform } from '@angular/core';
import { teamModel } from './models/teamModel';

@Pipe({
  name: 'teamSearch'
})
export class TeamSearchPipe implements PipeTransform {

  transform(teams:teamModel[], searchVal:string): teamModel[] {
    if(!teams||!searchVal)
      return teams
    else{
      return teams.filter(team=>
        team.team_name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())||
        team.team_def.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())||
        team.relatedDepName.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
        )
    }
    }
  

}
