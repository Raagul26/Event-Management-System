import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [],
})
export class UserDetailsComponent implements OnInit {
  userDetails!: User;

  userDetailsForm!: FormGroup;
  editShow: boolean = true;
  readonly: boolean = true;
  displaySpinner: boolean = true;

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getUser().subscribe((res) => {
      this.userDetails = res;
      this.userDetailsForm = new FormGroup({
        firstName: new FormControl(this.userDetails.data.firstName, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        lastName: new FormControl(this.userDetails.data.lastName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15),
        ]),
        contactNo: new FormControl(this.userDetails.data.contactNo, [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'),
        ]),
      });
    });

    this.displaySpinner = false;
  }

  edit(): void {
    if (this.editShow) {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
    } else {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
    }
  }

  onSubmit(): void {
    if (this.userDetailsForm.valid) {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
      this.apiService
        .updateUser(this.userDetailsForm.value)
        .subscribe((res) => console.log(res));
    }
  }
}
