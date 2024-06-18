// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { SignInComponent } from './sign-in/sign-in.component';
// import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
// import { MainLayoutComponent } from './main-layout/main-layout.component'; // Import MainLayoutComponent
// import { FormsModule }   from '@angular/forms';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     SignInComponent,
//     MainLayoutComponent // Declare MainLayoutComponent
//   ],
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     AppRoutingModule // Import AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AppRoutingModule } from './app-routing.module'; // Ensure this path is correct
import { StudentService } from './student.service';
import { QuoteService } from './quote.service';
import { AdminComponent } from './admin/admin.component';
import { ReevaluationComponent } from './reevaluation/reevaluation.component'; // Ensure this path is correct
import { GooglePayButtonModule } from '@google-pay/button-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    MainLayoutComponent,
    StudentListComponent,
    AdminComponent,
    ReevaluationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GooglePayButtonModule
  ],
  providers: [StudentService, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
