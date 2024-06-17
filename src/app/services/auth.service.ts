import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3302/users/signup';
  
  constructor(private http: HttpClient) { }

  checkEmailExists(email: string) {
    return this.http.post<any>('http://localhost:3302/users/check-email', { email });
  }

  signup(userData: any) {
    return this.http.post<any>('http://localhost:3302/users/signup', userData);
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3302/users/login', { email, password });
  }
}
