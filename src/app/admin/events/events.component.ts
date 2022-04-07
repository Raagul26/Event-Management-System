import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { Events, FAILURE, SUCCESS } from 'src/app/app.model';
import {
  CREATE,
  DELETEEVENT,
  DELETEEVENTCONFIRMATION,
  EventData,
  EVENTDELETED,
  EVENTNOTDELETED,
  UPDATE,
} from '../admin.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styles: [],
})
export class EventsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  events!: Events;
  loading: boolean = true;

  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getActiveEvents().subscribe((res) => {
      this.events = res;
      this.loading = false;
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  deleteEvent(eventId: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: DELETEEVENTCONFIRMATION + eventId,
        btnName: DELETEEVENT,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.apiService.deleteEvent(eventId).subscribe(
          () => {
            this.openSnackBar(EVENTDELETED, SUCCESS);
            this.ngOnInit();
          },
          () => this.openSnackBar(EVENTNOTDELETED, FAILURE)
        );
      }
    });
  }

  editEvent(event: EventData): void {
    this.dialog.open(EventModalComponent, {
      data: {
        title: UPDATE,
        row: event,
      },
    });
  }

  create(): void {
    this.dialog.open(EventModalComponent, {
      data: {
        title: CREATE,
      },
    });
    this.ngOnInit();
  }

  toRupeesFormat(num: Number): string {
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
