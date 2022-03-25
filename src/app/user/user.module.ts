import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { AvailableEventsComponent } from './available-events/available-events.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    HomeComponent,
    AvailableEventsComponent,
    UserEventsComponent,
    UserDetailsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatAutocompleteModule
  ]
})
export class UserModule {}
