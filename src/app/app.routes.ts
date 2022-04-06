import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Auth/signup/signup.component';
import { HeaderComponent } from './Header/Header.component';
import { LoginComponent } from './Auth/login/login.component';


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'home', component: HeaderComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent }
]