import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AdministrationComponent } from '../../administration/administration.component';
import { UsersComponent } from '../../administration/users/users.component';
import { TeamsComponent } from '../../administration/teams/teams.component';
import { DepartmentsComponent } from '../../administration//departments/departments.component';
import { AllTasksComponent } from '../../administration//all-tasks/all-tasks.component';
import { LoginComponent } from '../../login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { TasksComponent } from '../../tasks/tasks.component';
import { MyTeamComponent } from '../..//my-team/my-team.component';
import { CompanyInformationComponent } from '../../administration/company-information/company-information.component';
import { CompanyInfoComponent } from '../../company-info/company-info.component';

const redirect = () => redirectUnauthorizedTo(['/dashboard'])
export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {
            authGuardPipe: redirect
        }
    },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'my-team', component: MyTeamComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'typography', component: TypographyComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'icons', component: IconsComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [AngularFireAuthGuard] },
    {
        path: 'administration', component: AdministrationComponent,
        children: [{ path: 'users', component: UsersComponent, canActivate: [AngularFireAuthGuard] },
        { path: 'teams', component: TeamsComponent, canActivate: [AngularFireAuthGuard] },
        { path: 'departments', component: DepartmentsComponent, canActivate: [AngularFireAuthGuard] },
        { path: 'company-information', component: CompanyInformationComponent, canActivate: [AngularFireAuthGuard] },
        { path: 'tasks', component: AllTasksComponent, canActivate: [AngularFireAuthGuard] }], canActivate: [AngularFireAuthGuard]
        
    },
    {path:'company-info',component:CompanyInfoComponent,canActivate:[AngularFireAuthGuard]},
    { path: '/', component: LoginComponent },
    { path: '**', component: LoginComponent }
];
