import { Component, OnInit } from '@angular/core';
import { ROUTES, SidebarComponent } from '../components/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { UsersService } from './administrativeServices/users.service';
import { userModel } from '../models/userModel';
import { MdbIconComponent } from 'angular-bootstrap-md';



@Component({
  selector: 'app-upgrade',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  menuItems: any[];
  router:Router;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

isAdmin(){
  if(localStorage.getItem('authLevel')=='admin'){
    return true
  }
  else{
    return false
  }
}

}
