import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  userData = {
    firstName:'',
    lastName: '',
    email: '',
    password: ''
  };

  errorMessage = '';

  /*constructor(private http: HttpClient) { }

   submitForm() {
    this.http.post('http://localhost:3302/users/signup', this.userData).subscribe({
      next: response => {
        console.log('Response from server:', response);
      },
      error: error => {
        console.error('Error from server:', error);
      }
    });
  } */

  constructor(private authService: AuthService) { }

  submitForm() {
    this.authService.checkEmailExists(this.userData.email).subscribe({
      next: (response: any) => {
        console.log('Response from server:', response);
        this.errorMessage = '';
        // Email is not used, you can register
        this.authService.signup(this.userData).subscribe({
          next: (signupResponse: any) => {
            console.log('Signup successful', signupResponse);
          },
          error: (error: any) => {
            console.error('Signup failed', error);
            this.errorMessage = error.error.message; // Backend'den gelen hata mesajını göster
          }
        });
      },
      error: (error: any) => {
        console.error('Error checking email:', error);
        this.errorMessage = error.error.message; // Backend'den gelen hata mesajını göster
      }
    });
  }
}
