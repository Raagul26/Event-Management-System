import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EventData } from 'src/app/admin/admin.model';
import { DataArray, FAILURE, SUCCESS } from 'src/app/app.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
import {
  CANCELCONFIRMATION,
  CANCELEVENT,
  EVENTCANCELLED,
  POSTERPATH,
} from '../user.model';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styles: [],
})
export class UserEventsComponent implements OnInit {
  displaySpinner: boolean = true;
  bookedEvents!: DataArray;
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
        data: bookedEvents.data.map((eachData: EventData) => {
          eachData.img = POSTERPATH + this.randomNo() + '.jpg';
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
        title: CANCELCONFIRMATION + eventId,
        btnName: CANCELEVENT,
      },
    });
    this.confirmation = await dialogRef.afterClosed().toPromise().then();

    if (this.confirmation) {
      this.apiService.cancelEvent(eventId).subscribe(
        () => {
          this.ngOnInit();
          this.openSnackBar(EVENTCANCELLED, SUCCESS);
        },
        (err) => this.openSnackBar(err.message, FAILURE)
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
