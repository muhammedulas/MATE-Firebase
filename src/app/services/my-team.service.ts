import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {
  private usersLoc = '/users'
  private usersRef: AngularFireList<userModel>
  constructor(private db: AngularFireDatabase) { this.usersRef = db.list(this.usersLoc) }

  getMembers() {
    return this.usersRef
  }

  getMemberByTeamKey(){
    return this.db.database.ref('users').orderByChild('team_key').equalTo(localStorage.getItem('teamKey'))
  }


}
