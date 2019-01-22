import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
    {
        path: 'authenticate',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: './company/company.module#CompanyModule'
            }, {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            }]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'authenticate'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
