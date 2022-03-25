import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styles: [],
})
export class UserEventsComponent implements OnInit {
  displaySpinner: boolean = true;
  bookedEvents!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmation!: boolean;

  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getBookings().subscribe((bookedEvents) => {
      this.bookedEvents = {
        data: bookedEvents.data.map((eachData) => {
          eachData.img =
            '../../../assets/Event Images/event' + this.randomNo() + '.jpg';
          return eachData;
        }),
      };
      this.displaySpinner = false;
    });
  }

  async cancelEvent(event: Event): Promise<void> {
    var eventId = (<HTMLButtonElement>event.target).id;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: `Are you sure you want to cancel the event - ${eventId}`,
        btnName: 'Cancel Event',
      },
    });
    this.confirmation = await dialogRef.afterClosed().toPromise().then();

    if (this.confirmation) {
      this.apiService.cancelEvent(eventId).subscribe(
        () => {
          this.ngOnInit();
          this.openSnackBar('Event Cancelled Successfully', 'green-snackbar');
        },
        (err) => this.openSnackBar(err.message, 'redSnackbar')
      );
    }
  }

  randomNo(): number {
    return Math.floor(Math.random() * 6);
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }
}
