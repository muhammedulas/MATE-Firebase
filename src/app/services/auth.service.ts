import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router, RouterLink } from '@angular/router';
import { UsersComponent } from '../administration/users/users.component';
import { userModel } from '../models/userModel'
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private firebaseDB: AngularFireDatabase) { this.userDBRef = firebaseDB.list(this.userLocation) }
  private userLocation = '/users';
  public userToAdd: userModel
  private userDBRef: AngularFireList<userModel>;


  logout() {
    return this.firebaseAuth.signOut(),
      console.log(localStorage.getItem('currentUserUID' + 'signed out')),
      localStorage.removeItem('currentUserUID')
  }

  createUser(userToAdd: userModel) {
    this.firebaseAuth.createUserWithEmailAndPassword(userToAdd.mail, userToAdd.password)
      .then((user) => {
        this.userToAdd.uid = user.user.uid
        this.addUserToTable()
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error: " + errorCode + " description: " + errorMessage)
      });
  }

  addUserToTable() {
    this.userDBRef.push(this.userToAdd)
    
  }


  isLoggedIn() {
    if (this.firebaseAuth.currentUser != null) {
      return true
    }
    else {
      return false
    }

  }

  login(email, password) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        redirectLoggedInTo('dashboard')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  getCurrentUserUID() {
    this.firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        localStorage.setItem('currentUserUID', user.uid)
        console.log(localStorage.getItem('currentUserUID') + ' is signed in')
      } else {
        // No user is signed in.
        console.log('There is no user currently signed in')
      }
    });

  }


}