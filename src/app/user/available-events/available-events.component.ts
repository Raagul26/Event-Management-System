import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventData } from 'src/app/admin/admin.model';
import {
  DataArray,
  Events,
  FAILURE,
  INFO,
  SUCCESS,
  Titles,
} from 'src/app/app.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
import {
  BOOKCONFIRMATION,
  BOOKEVENT,
  EVENTBOOKED,
  PLEASELOGIN,
  POSTERPATH,
} from '../user.model';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styles: [],
})
export class AvailableEventsComponent implements OnInit {
  events!: DataArray;
  displaySpinner: boolean = true;
  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn');
  userId = localStorage.getItem('userId');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredOptions!: Observable<string[]>;
  options!: string[];
  myControl: FormControl = new FormControl('');

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getActiveEvents().subscribe((res: Events) => {
      this.displaySpinner = false;
      this.events = {
        data: res.data.map((eachData: EventData) => {
          eachData.img = POSTERPATH + this.randomNo() + '.jpg';
          return eachData;
        }),
      };
    });

    this.apiService.getEventTitles().subscribe((res: Titles) => {
      this.options = res.data;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  filter(): EventData[] {
    return this.events.data.filter((s: EventData) =>
      s.title.includes(this.myControl.value)
    );
  }

  randomNo(): number {
    return Math.floor(Math.random() * 6);
  }

  toRupeesFormat(num: Number): string {
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  bookEvent(eventId: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: BOOKCONFIRMATION + eventId,
        btnName: BOOKEVENT,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.isLoggedIn == 'true' && res) {
        localStorage.setItem('eventId', eventId);
        this.apiService.bookEvent().subscribe(
          () => {
            this.openSnackBar(EVENTBOOKED, SUCCESS);
          },
          (err) => {
            this.openSnackBar(err.error.message, FAILURE);
          }
        );
      } else if (this.isLoggedIn != 'true') {
        this.openSnackBar(PLEASELOGIN, INFO);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
