import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {FutureDaysComponent} from './future-days/future-days.component';
import {OpenRoleComponent} from './open-role/open-role.component';
import {HomeComponent} from './home/home.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import {StaffViewComponent} from './staff-view/staff-view.component';
import {StaffAssignmentComponent} from './staff-assignment/staff-assignment.component';
import {ProjectStaffingComponent} from './project-staffing/project-staffing.component';
import {StaffTimeLineComponent} from './staff-time-line/staff-time-line.component';
import {ProjectQuickViewsComponent} from './project-quick-views/project-quick-views.component';
import {StaffQuickViewsComponent} from './staff-quick-views/staff-quick-views.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'project',
        children: [
            {
                path: 'view',
                component: ProjectViewComponent,
                canActivate: [AuthGuard],
                data: {some_data: 'some value'}
            }
        ]
    }, {
        path: 'staff',
        children: [
            {
                path: 'view',
                component: StaffViewComponent,
                canActivate: [AuthGuard]
            }
        ]
    }, {
        path: 'futureDays',
        component: FutureDaysComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'openRole',
        component: OpenRoleComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'staffAssignment',
        component: StaffAssignmentComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'projectStaffing',
        component: ProjectStaffingComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'staffTimeline',
        component: StaffTimeLineComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'projectQuickViews',
        component: ProjectQuickViewsComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'staffQuickViews',
        component: StaffQuickViewsComponent,
        canActivate: [AuthGuard]
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
}
