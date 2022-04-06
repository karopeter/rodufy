import { Component, OnInit } from '@angular/core';
import { Auth } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   auth: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onCreateUser(form: NgForm): void {
    console.warn(this.auth);
    this.authService.register(this.auth).subscribe((response: any) => {
      this.auth.email = '';
      this.auth.password = '';
      console.log('Message Sent' + response);
    });
    form.reset();
  } 
}
