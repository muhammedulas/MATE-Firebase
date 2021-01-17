import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { map } from 'rxjs/operators';
import { userModel } from '../../models/userModel';
import { UsersService } from '../administrativeServices/users.service';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from '../administration.component';
import { FormsModule } from '@angular/forms'
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchFilterPipe } from '../../search-filter.pipe';
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() AdministrationComponent: AdministrationComponent = null
  router:Router;
  public searchBoxValue: string
  public usersList: userModel[];
  public tempUser: userModel = {
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
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    if(localStorage.getItem('authLevel')!='admin'){
      this.router.navigate(['dashboard'])
    }

    this.usersService.getUsers().snapshotChanges().pipe(

      map(changes =>

        changes.map(c =>

          ({ key: c.payload.key, ...c.payload.val() })

        )

      )

    ).subscribe(data => {

      this.usersList = data;
      console.log(this.usersList)
    });
  }

  createUser(user) {
    this.usersService.createUser(user)
  }

  authLevelCombo(value) {
    this.tempUser.authLevel = value
  }

  deleteUser(usrKey) {
    this.usersService.deleteUser(usrKey)
  }

  resetTemp() {
    this.tempUser = {
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
  }

  updateUser(user: userModel) {
    var updates = {}
    updates['/users/' + user.key] = user
    this.usersService.updateUser(updates)
  }

  sendPasswordResetMail(mail) {
    this.usersService.sendPasswordResetMail(mail)
  }
}
