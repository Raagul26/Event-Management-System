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

  async ngOnInit(): Promise<void> {
    this.events = await this.apiService.getAllEvents().toPromise().then();

    this.users = await this.apiService.getAllUsers().toPromise().then();

    this.bookings = await this.apiService.getTotalBookings().toPromise().then();

    this.displaySpinner = false;
  }
}
