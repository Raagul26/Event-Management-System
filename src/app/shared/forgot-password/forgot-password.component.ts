import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  mailSent: boolean = false;
  spinner:boolean=false
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
      ]),
    });
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.spinner=true
      this.apiService
        .forgotPassword(this.forgotPasswordForm.value.emailId)
        .subscribe((res) => {
          this.mailSent = true;
          this.spinner=false
        });
    }
  }
}
