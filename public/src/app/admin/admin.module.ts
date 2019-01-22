import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombinationCreateComponent } from './access-type-combination/combination-create/combination-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomLabelCreateComponent } from './custom-label/custom-label-create/custom-label-create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownsModule,
    InputsModule,
    AdminRoutingModule
  ],
  declarations: [
    CombinationCreateComponent,
    AdminComponent,
    UserCreateComponent,
    RoleCreateComponent,
    CustomLabelCreateComponent
  ]
})
export class AdminModule {}
