import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted');
      console.log('Email:', this.checkoutForm.value.email);
      console.log('Password:', this.checkoutForm.value.password);
      // Burada form verilerini işleyebilirsiniz
    }
  }
}
