import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Genel Bakış', icon: 'design_app', class: '' },
  { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
  { path: '/maps', title: 'Maps',  icon:'location_map-big', class: 'disabled' },
  { path: '/tasks', title: 'Görevler', icon: 'ui-1_check', class: '' },
  { path: '/my-team', title: 'Ekibim', icon: 'users_single-02', class: '' },
  { path: '/user-profile', title: 'Profil', icon: 'business_badge', class: '' },
  { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public UID: string;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.UID = localStorage.getItem('currentUserUID')
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };

  userIsAdmin() {
    if (localStorage.getItem('authLevel') == 'admin') {
      return true
    }
    else
    return false
  }

  isManager() {
    if (localStorage.getItem('role') == 'Ekip Lideri') {
      return true
    }
    else
    return false
  }

}
