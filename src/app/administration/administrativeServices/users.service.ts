import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { customClaims } from '@angular/fire/auth-guard';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { userModel } from '../../models/userModel';
import { AdministrationComponent } from '../administration.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userToAdd: userModel
  private dbUsers = '/users'
  usersRef: AngularFireList<userModel>
  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) { this.usersRef = db.list(this.dbUsers) }

  getUsers() {
    return this.usersRef
  }

  createUser(usr: userModel) {
    this.userToAdd = usr
    this.firebaseAuth.createUserWithEmailAndPassword(usr.mail, usr.password)
      .then((user) => {
        this.userToAdd.uid = user.user.uid
        this.addUserToTable()
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error: " + errorCode + " description: " + errorMessage)
      });
    if (usr.authLevel == "admin") {

    }
  }

  addUserToTable() {
    var kayit_key = this.usersRef.push(this.userToAdd).key
    console.log(kayit_key + " created")
    this.userToAdd.key = kayit_key
    this.usersRef.update(kayit_key, this.userToAdd)
  }


  updateUser(updates) {
    this.db.database.ref().update(updates)
  }



  deleteUser(usrKey) {
    this.usersRef.remove(usrKey)

  }

  sendPasswordResetMail(mail) {
    this.firebaseAuth.sendPasswordResetEmail(mail)
  }

  connectUserToTeam(team_key,team_name,user:userModel,role){
    this.db.database.ref('users/' + user.key + '/team_key').set(team_key)
    this.db.database.ref('users/' + user.key + '/team_name').set(team_name)
    this.db.database.ref('users/' + user.key + '/role').set(role)
  }

  dismissUserFromTeam(user:userModel){
    this.db.database.ref('users/' + user.key + '/team_key').set("")
    this.db.database.ref('users/' + user.key + '/team_name').set("")
    this.db.database.ref('users/' + user.key + '/role').set("")
  }

}
