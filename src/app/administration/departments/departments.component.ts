import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { teamModel } from '../../models/teamModel';
import { departmentModel } from '../../models/departmentModel'
import { DepartmentsService } from '../administrativeServices/departments.service';
import { TeamsService } from '../administrativeServices/teams.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  public searchInDeps: string;
  public searchTeams: string;
  public teamsList: teamModel[]=[];
  public depList: departmentModel[];
  public tempDep: departmentModel = {
    department_name: "",
    department_def: "",
    department_key: ""
  }
  constructor(private depService: DepartmentsService, private teamsService: TeamsService) { }

  ngOnInit() {
    this.depService.getDeps().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.depList = data;
      console.log(this.depList)
    });
    this.teamsService.getTeams().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.teamsList = data;
      console.log(this.teamsList)
    });
  }

  createDepartment() {
    this.depService.createDepartment(this.tempDep)
  }

  deleteDep(key) {
    this.depService.deleteDep(key)
  }

  updateDep(dep: departmentModel) {
    /*var updates = {}
    updates['/departments/' + dep.department_key] = dep*/
    this.depService.updateDep(dep)
  }

  connectTeamToDep(team_key, dep_key, dep_name) {
    this.teamsService.connectTeamToDep(team_key, dep_key, dep_name)
  }

  disconnectTeamFromDep(team_key) {
    this.teamsService.disconnectTeamFromDep(team_key)
  }
}
