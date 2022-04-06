import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { HeaderComponent } from './Header/Header.component';
import { ExcelComponent } from './Excel/excel.component';
import { ContactComponent } from './Contact/contact.component';
import { FooterComponent } from './Footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    ExcelComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'home', component: HeaderComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
