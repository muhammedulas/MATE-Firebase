import { Component, OnInit } from '@angular/core';
import { userModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database'
import { UserProfileService } from '../services/user-profile.service';
import { map } from 'rxjs/operators';
import * as mdb from 'angular-bootstrap-md'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})




export class UserProfileComponent implements OnInit {
  public profile: userModel={
    mail: "",
    password: "",
    uid: "",
    displayName: "",
    additionalInfo: "",
    firstName!: "",
    lastName!: "",
    phone!: "",
    adress!: {
      country: "",
      province: "",
      district: "",
      openAdress: "...",
      postalCode: ""
    },
    authLevel!: "",
    key: "",
    team_key:"",
    team_name:"",
    role:""
  }
  public   innerHTML = '<a class="btn btn-primary">Güncelle</a>';

  constructor(private authService: AuthService, private userProfileService: UserProfileService) { }


  ngOnInit() {
    this.userProfileService.getInfoByKey().once('value').then((snapshot) => {
      this.profile = snapshot.val()
      localStorage.setItem('teamKey',this.profile.team_key)
      localStorage.setItem('teamName',this.profile.team_name)
    });
    
  }

  setInfo(info){
    this.userProfileService.setAdditionalInfo(info)
  }

}