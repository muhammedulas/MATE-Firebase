import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { LoginComponent } from './login/login.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministrationComponent } from './administration/administration.component';
import { UsersComponent } from './administration/users/users.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CardsModule } from 'angular-bootstrap-md';
import { SearchFilterPipe } from './search-filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { TasksComponent } from './tasks/tasks.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { DepartmentsComponent } from './administration/departments/departments.component';
import { DepSearchPipe } from './depSearch.pipe';
import { TeamsComponent } from './administration/teams/teams.component';
import { DepFilterPipe } from './depFilter.pipe';
import { OrderByPipe } from './orderBy.pipe';
import { TeamSearchPipe } from './teamSearch.pipe';
import { FilterByTeamPipe } from './filterByTeam.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AllTasksComponent } from './administration/all-tasks/all-tasks.component';
import { TaskSearchPipe } from './taskSearch.pipe';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyInformationComponent } from './administration/company-information/company-information.component';
import { CompanyInfoService } from './company-info/companyInfo.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';







const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  //tosUrl: '<your-tos-link>',
  //privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE

};





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NgbModalModule,
    MDBBootstrapModule.forRoot(),
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UsersComponent,
    DepartmentsComponent,
    TeamsComponent,
    AllTasksComponent,
    CompanyInformationComponent,
    SearchFilterPipe,
    TasksComponent,
    MyTeamComponent,
    DepSearchPipe,
    DepFilterPipe,
    OrderByPipe,
    TeamSearchPipe,
    FilterByTeamPipe,
    TaskSearchPipe,
    CompanyInfoComponent,
  ],
  exports:[MDBBootstrapModule,SearchFilterPipe],
  providers: [NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
