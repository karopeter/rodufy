import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError, Observable } from 'rxjs';
import { Auth } from '../models/auth';

const baseUrl = 'www.giropay.xyz/api/v1/giro-app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  private sub!: Subscription;
   
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, data,  this.httpOptions).pipe(catchError(this.handleError), tap((resData: any) => {
      console.log(resData);
    }));
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

