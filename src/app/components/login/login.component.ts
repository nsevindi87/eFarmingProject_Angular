import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.userData.email || !this.userData.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }
    
    this.authService.login(this.userData.email, this.userData.password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/profile']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = error.error.message; 
      }
    });
  }
}
