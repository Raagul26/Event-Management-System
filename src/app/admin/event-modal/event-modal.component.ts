import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EVENTS, FAILURE, SUCCESS } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';
import {
  EVENTCREATED,
  EVENTNOTCREATED,
  EVENTNOTUPDATED,
  EVENTUPDATED,
} from '../admin.model';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './event-modal.component.html',
  styles: [],
})
export class EventModalComponent implements OnInit {
  EventForm!: FormGroup;
  close: boolean = false;
  minDate: Date = new Date();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit():void{
    this.EventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      venue: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(100)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(500),
      ]),
    });

    if (this.data.title == 'update') {
      this.EventForm = new FormGroup({
        title: new FormControl(this.data.row.title, [
          Validators.required,
          Validators.minLength(10),
        ]),
        venue: new FormControl(this.data.row.venue, [
          Validators.required,
          Validators.minLength(3),
        ]),
        date: new FormControl(this.data.row.date, [Validators.required]),
        amount: new FormControl(this.data.row.amount, [
          Validators.required,
          Validators.min(100),
        ]),
        description: new FormControl(this.data.row.description, [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(500),
        ]),
      });
    }
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  createEvent(): void {
    if (this.EventForm.valid && this.data.title == 'create') {
      this.apiService.createEvent(this.EventForm.value).subscribe(
        () => {
          this.openSnackBar(EVENTCREATED, SUCCESS);
          this.reloadComponent();
        },
        () => this.openSnackBar(EVENTNOTCREATED, FAILURE)
      );
      this.dialog.closeAll();
    } else if (this.EventForm.valid && this.data.title == 'update') {
      this.apiService.updateEvent(this.EventForm.value).subscribe(
        () => {
          this.openSnackBar(EVENTUPDATED, SUCCESS);
          this.reloadComponent();
        },
        () => this.openSnackBar(EVENTNOTUPDATED, FAILURE)
      );
      this.dialog.closeAll();
    }
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([EVENTS]);
  }
}
