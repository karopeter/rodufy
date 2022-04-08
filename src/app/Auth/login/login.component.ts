import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   auth: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     
  }

  onLoginUser(form: NgForm): void {
    console.warn(this.auth);
    this.authService.login(this.auth).subscribe((response: any) => {
       this.auth.email = '';
       this.auth.password = '';
       console.log(response);
    }, error => {
      console.log(error);
    }); 
    form.reset();
  }
}
