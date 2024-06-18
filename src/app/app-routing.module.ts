import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { StudentListComponent } from './student-list/student-list.component'; // Make sure to import MainLayoutComponent
import { AdminComponent } from './admin/admin.component';
import { ReevaluationComponent } from './reevaluation/reevaluation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'student', component: StudentListComponent },
  {path : 'admin',component : AdminComponent},
  { path: 'reevaluation', component: ReevaluationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
