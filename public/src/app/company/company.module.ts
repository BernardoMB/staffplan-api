import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import {ProjectDetailsGridComponent} from './project-view-staff-details-grid/project-view-staff-details-grid.component';
import {StaffViewComponent} from './staff-view/staff-view.component';
import {StaffViewProjectDetailsGridComponent} from './staff-view-project-details-grid/staff-view-project-details-grid.component';
import {StaffViewProjectDetailsPopoverComponent} from './staff-view-project-details-popover/staff-view-project-details-popover.component';
import {ProjectViewStaffDetailPopoverComponent} from './project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import {FutureDaysComponent} from './future-days/future-days.component';
import {OpenRoleComponent} from './open-role/open-role.component';
import {StaffAssignmentComponent} from './staff-assignment/staff-assignment.component';
import {ProjectAddComponent} from './project-add/project-add.component';
import {ProjectStaffingComponent} from './project-staffing/project-staffing.component';
import {StaffTimeLineComponent} from './staff-time-line/staff-time-line.component';
import {StaffAddComponent} from './staff-add/staff-add.component';
import {AssignStaffPopoverComponent} from './assign-staff-popover/assign-staff-popover.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {GridModule, PDFModule, ExcelModule} from '@progress/kendo-angular-grid';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DatePickerModule} from '@progress/kendo-angular-dateinputs';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {SparklineModule} from '@progress/kendo-angular-charts';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {PopupModule} from '@progress/kendo-angular-popup';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CompanyRoutingModule} from './company-routing.module';
import {PrintComponent} from './print/print.component';
import {NumberDirective} from '../numbers-only.directive';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import { ProjectQuickViewsComponent } from './project-quick-views/project-quick-views.component';
import { StaffQuickViewsComponent } from './staff-quick-views/staff-quick-views.component';

@NgModule({
    imports: [
        CompanyRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputsModule,
        ButtonsModule,
        DatePickerModule,
        DropDownsModule,
        GridModule,
        PDFModule,
        ExcelModule,
        SparklineModule,
        DialogsModule,
        PopupModule,
        LayoutModule,
        NgxTrimDirectiveModule,
        NgbModule.forRoot(),
        NgCircleProgressModule.forRoot()
    ],
    declarations: [HomeComponent,
        ProjectViewComponent,
        ProjectDetailsGridComponent,
        StaffViewComponent,
        StaffViewProjectDetailsGridComponent,
        StaffViewProjectDetailsPopoverComponent,
        ProjectViewStaffDetailPopoverComponent,
        FutureDaysComponent,
        OpenRoleComponent,
        StaffAssignmentComponent,
        ProjectStaffingComponent,
        ProjectAddComponent,
        StaffTimeLineComponent,
        StaffAddComponent,
        AssignStaffPopoverComponent,
        PrintComponent,
        NumberDirective,
        ProjectQuickViewsComponent,
        StaffQuickViewsComponent
    ]
})
export class CompanyModule {
}
