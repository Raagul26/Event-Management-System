import { HttpHeaders } from '@angular/common/http';

export interface Events {
  status: string;
  message: string;
  data: {
    id: string;
    eventId: string;
    title: string;
    venue: string;
    date: string;
    amount: string;
    description: string;
    createdBy: string;
    createdOn: string;
    lastUpdatedOn: string;
    status: 'active' | 'deleted';
    img?: string;
  }[];
}

export interface OneEvent {
  status: string;
  message: string;
  data: {
    id: string;
    eventId: string;
    title: string;
    venue: string;
    date: string;
    amount: string;
    description: string;
    createdBy: string;
    createdOn: string;
    lastUpdatedOn: string;
    status: 'active' | 'deleted';
    img?: string;
  };
}

export interface DataArray {
  data: {
    id: string;
    eventId: string;
    title: string;
    venue: string;
    date: string;
    amount: string;
    description: string;
    createdBy: string;
    createdOn: string;
    lastUpdatedOn: string;
    status: 'active' | 'deleted';
    img?: string;
  }[];
}

export interface User {
  status: string;
  message: string;
  data: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    contactNo: string;
    userType: string;
    createdOn: string;
    status: 'active' | 'deleted';
  };
}

export interface Signup {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  contactNo: string;
}

export interface Login {
  emailId: string;
  password: string;
}


export interface LoginResponse {
  headers: HttpHeaders;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  type:number
  body: {
    status: string;
    message: string;
    data: { userId: string };
  };
}

export interface Response {
  status: string;
  message: string;
}

export interface BookingsCount {
  status: string;
  message: string;
  data: number;
}

export interface Titles {
  status: string;
  message: string;
  data: string[];
}

// paths

export const SIGNUP = '/signup';
export const LOGIN = '/login';

export const DASHBOARD = '/dashboard';
export const USERS = '/dashboard/users';
export const EVENTS = '/dashboard/events';
export const BOOKINGS = '/dashboard/bookings';

export const HOME = '';
export const BOOKEDEVENTS = '/bookedEvents';
export const PROFILE = '/profile';

// snackbar styles

export const SUCCESS = 'green-snackbar';
export const FAILURE = 'red-snackbar';
export const INFO = 'white-snackbar';

export const JWTTOKEN = 'jwttoken';
