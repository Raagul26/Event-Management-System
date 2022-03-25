import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Users } from '../admin.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users!:Users
  error?:HttpErrorResponse
  loading:boolean =true
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      res => {this.users = res;this.loading=false},
      err => this.error = err
    )
  }

}
