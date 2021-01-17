import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { teamModel } from '../../models/teamModel';
import { TeamsService } from '../administrativeServices/teams.service';
import { FormControl } from '@angular/forms';
import { UsersService } from '../administrativeServices/users.service';
import { userModel } from '../../models/userModel';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public searchInTeams: string;
  public searchUsers: string;
  public searchAvailableUsers:string;
  public teamList: teamModel[]=[];
  public availableUsers: userModel[]=[]
  public tempTeam: teamModel = {
    team_name: "",
    team_def: "",
    team_key: "",
    relatedDepartment: ""
  }
  constructor(private teamsService: TeamsService, private usersService: UsersService) { }

  ngOnInit() {
    this.teamsService.getTeams().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.teamList = data;
      console.log(this.teamList)
    });

    this.usersService.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })
        ))
    ).subscribe(data =>
      this.availableUsers = data)
  }

  createTeam() {
    this.teamsService.createTeam(this.tempTeam)
  }

  deleteTeam(key) {
    this.teamsService.deleteTeam(key)
  }

  updateTeam(team: teamModel) {
    var updates = {}
    updates['/teams/' + team.team_key] = team
    this.teamsService.updateTeam(updates)
  }

  connectUserToTeam(team_key, team_name, user: userModel, role) {
    this.usersService.connectUserToTeam(team_key, team_name, user, role)
  }

  dismissUserFromTeam(user: userModel) {
    this.usersService.dismissUserFromTeam(user)
  }


}