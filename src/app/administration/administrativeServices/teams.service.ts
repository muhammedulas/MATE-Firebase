import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { teamModel } from '../../models/teamModel';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  public teamToAdd: teamModel
  private dbTeams = '/teams'
  teamsRef: AngularFireList<teamModel>
  constructor(private db: AngularFireDatabase) { this.teamsRef = db.list(this.dbTeams) }

  createTeam(team) {
    var kayit_key = this.teamsRef.push(team).key
    console.log(kayit_key + " created")
    team.team_key = kayit_key
    this.teamsRef.update(kayit_key, team)
  }

  getTeams() {
    return this.teamsRef
  }

  getTeamsByDep(dep_key) {
    return this.db.database.ref('/teams').orderByChild('relatedDepartment').equalTo(dep_key)
  }

  deleteTeam(team_key) {
    this.teamsRef.remove(team_key)

  }

  updateTeam(updates) {
    this.db.database.ref().update(updates)
  }

  connectTeamToDep(team_key, dep_key, dep_name) {
    this.db.database.ref('teams/' + team_key + '/relatedDepartment').set(dep_key)
    this.db.database.ref('teams/' + team_key + '/relatedDepName').set(dep_name)
  }
  disconnectTeamFromDep(team_key) {
    this.db.database.ref('teams/' + team_key + '/relatedDepartment').set("")
    this.db.database.ref('teams/' + team_key + '/relatedDepName').set("")
  }
}
