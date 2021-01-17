import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AdministrationComponent } from '../../administration/administration.component';
import { TeamMatesPipe } from '../../dashboard/teamMates.pipe';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearhTeammatesPipe } from '../../dashboard/searhTeammates.pipe';
import { SearchTodosPipe } from '../../dashboard/searchTodos.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule,
    NgApexchartsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    AdministrationComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    TeamMatesPipe,
    SearhTeammatesPipe,
    SearchTodosPipe



  ]
})

export class AdminLayoutModule { }
