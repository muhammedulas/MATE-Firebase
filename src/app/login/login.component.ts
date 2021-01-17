import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  login(mail, pw) {
    this.AuthService.login(mail, pw)

  }


  ngOnInit() {
  }

}
