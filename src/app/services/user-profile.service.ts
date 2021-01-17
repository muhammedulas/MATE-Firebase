import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges } from '@angular/fire/database';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public user: userModel;
  private dbUsers = '/users'
  userRef: AngularFireList<userModel>
  private uid = localStorage.getItem('currentUserUID');
  constructor(private db: AngularFireDatabase) { this.userRef = this.db.list('users', q => q.orderByChild('uid').equalTo(localStorage.getItem('currentUserUID'))) }

  getUserInfo(uid) {
    /* return this.db.database.ref('users').orderByChild('uid').equalTo(uid)*/
    return this.userRef
  }

  getInfoByKey() {
    return this.db.database.ref('users/' + localStorage.getItem('userKey'))
  }

  setAdditionalInfo(info) {
    var key = localStorage.getItem('userKey')
    this.db.database.ref('users/' + key + '/additionalInfo').set(info)
  }
}