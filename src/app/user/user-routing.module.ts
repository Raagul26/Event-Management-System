import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { AvailableEventsComponent } from './available-events/available-events.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEventsComponent } from './user-events/user-events.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: AvailableEventsComponent },
      {
        path: 'bookedEvents',
        component: UserEventsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
