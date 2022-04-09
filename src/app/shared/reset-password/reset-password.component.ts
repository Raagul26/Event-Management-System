import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  newHide: boolean = true;
  confirmHide: boolean = true;
  payload!: string;
  expired!: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.payload = atob(this.router.url.split('/')[2].split('.')[1]);
    this.expired = JSON.parse(this.payload).exp < new Date().getTime() / 1000;

    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.apiService
        .resetPassword(
          JSON.parse(this.payload).sub,
          this.resetPasswordForm.value.confirmPassword
        )
        .subscribe(
          (res) => {
            this.openSnackBar(
              'Password Resetted Successfully',
              'green-snackbar'
            );
            this.router.navigateByUrl('/login');
          },
          (err) => {
            this.openSnackBar('Something Went Wrong', 'red-snackbar');
          }
        );
    }
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }
}
