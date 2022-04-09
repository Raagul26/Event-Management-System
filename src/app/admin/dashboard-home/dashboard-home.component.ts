import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Users } from '../admin.model';
import { BookingCount } from './dashboard-home.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styles: [],
})
export class DashboardHomeComponent implements OnInit {
  events!: Events;
  users!: Users;
  bookings!: BookingCount;
  displaySpinner: boolean = true;
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getAllEvents().subscribe((res)=>this.events=res);

    this.apiService.getAllUsers().subscribe((res)=>this.users=res)

    this.apiService.getTotalBookings().subscribe(res=>this.bookings=res)

    this.displaySpinner = false;
  }
}
