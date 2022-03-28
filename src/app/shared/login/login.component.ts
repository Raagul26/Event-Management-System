import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DASHBOARD, FAILURE, HOME, JWTTOKEN, LoginResponse, SUCCESS } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';
import { LOGINFAILED, LOGINSUCCESS } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hide: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private router:Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(new HttpResponse())
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  signIn(): void {
    if (this.loginForm.valid) {
      this.apiService.userLogin(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          
          this.openSnackBar(LOGINSUCCESS, SUCCESS);
          localStorage.setItem(JWTTOKEN, String(res.headers.get(JWTTOKEN)));
          let payload: string = String(res.headers.get(JWTTOKEN)).split('.')[1];
          let userType: string = atob(payload);
          localStorage.setItem('userId', String(res.body?.data.userId));
          if (JSON.parse(userType).role == 'user') {
            localStorage.setItem('isUserLoggedIn', 'true');
            this.router.navigate([HOME]);
          } else if (JSON.parse(userType).role == 'admin') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            this.router.navigate([DASHBOARD]);
          }
        },
        () => this.openSnackBar(LOGINFAILED, FAILURE)
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
