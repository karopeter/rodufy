import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError, Observable, Subject } from 'rxjs';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';

const baseUrl = 'www.giropay.xyz/api/v1/giro-app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  private sub!: Subscription;
  private isAuthenticated = false;
  private token!: string;
  private tokenTimer: any;
  private resetToken!: string;
  private userId!: string;
  private authStatusListener = new Subject<boolean>();

   
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getResetToken():void {
    this.resetToken;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, data,  this.httpOptions).pipe(catchError(this.handleError), tap((resData: any) => {
      console.log(resData);
    }));
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, data, this.httpOptions).pipe(catchError(this.handleError), tap((response: any) => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expierIn;
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() * expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
      }
      this.router.navigate(['/']);
    }));
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An  unknown error occured';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXIST':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exists';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
      }
      return throwError(errorMessage);
  }
}

