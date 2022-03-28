import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Titles } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Users } from '../admin.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styles: [],
})
export class BookingsComponent implements OnInit {
  eventForm!: FormGroup;
  users!: Users;
  error!: string;
  titles!: Titles;
  OnSubmit: boolean = false;
  loading: boolean = false;
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getEventTitles().subscribe((res) => {
      this.titles = res;
    });

    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.loading = true;
      this.apiService
        .getUsersByEventTitle(this.eventForm.value.eventTitle)
        .subscribe(
          (res) => {
            this.users = res;
            this.loading = false;
          },
          (err) => {
            this.error = err.message;
          }
        );
      this.OnSubmit = true;
    }
  }
}
