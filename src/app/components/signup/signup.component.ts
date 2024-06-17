import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone:true,
  imports: [
      FormsModule,
      ReactiveFormsModule,
    ]
})
export class SignupComponent {

  userData = {
    firstName:'',
    lastName: '',
    email: '',
    password: ''
  };

  errorMessage = '';

  
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
            this.errorMessage = error.error.message; // 
          }
        });
      },
      error: (error: any) => {
        console.error('Error checking email:', error);
        this.errorMessage = error.error.message; // 
      }
    });
  }

  /* myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  } */

}
