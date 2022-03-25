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
import { Events, Titles } from 'src/app/app.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styles: [],
})
export class AvailableEventsComponent implements OnInit {
  events!:any;
  displaySpinner: boolean = true;
  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn');
  userId = localStorage.getItem('userId');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredOptions!: Observable<string[]>;
  options!: string[];
  myControl: FormControl = new FormControl('');
  confirmation!: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getActiveEvents().subscribe((res:Events) => {
      this.displaySpinner = false;
      this.events = {
        data: res.data.map((eachData) => {
          eachData.img =
            '../../../assets/Event Images/event' + this.randomNo() + '.jpg';
          return eachData;
        }),
      };
    });

    this.apiService.getEventTitles().subscribe((res:Titles) => {
      this.options = res.data;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  filter() {
    return this.events.data.filter((s: any) =>
      s.title.includes(this.myControl.value)
    );
  }

  randomNo(): number {
    return Math.floor(Math.random() * 6);
  }

  toRupeesFormat(num: Number):string {
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

  async bookEvent(eventId:string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: `Are you sure you want to book the event - ${eventId}`,
        btnName: 'Book Event',
      },
    });
    this.confirmation = await dialogRef.afterClosed().toPromise().then();

    if (this.isLoggedIn == 'true' && this.confirmation) {
      localStorage.setItem('eventId', eventId);
      this.apiService.bookEvent().subscribe(
        () => {
          this.openSnackBar('Event Booked Successfully!', 'green-snackbar');
        },
        (err) => {
          this.openSnackBar(err.error.message, 'red-snackbar');
        }
      );
    } else if (this.isLoggedIn != 'true') {
      this.openSnackBar('Please login to book event...', 'white-snackbar');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter((option:string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
