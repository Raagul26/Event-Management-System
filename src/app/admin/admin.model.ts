export interface Users {
  status: string;
  message: string;
  data: [
    {
      id: string;
      userId: string;
      firstName: string;
      lastName: string;
      emailId: string;
      contactNo: string;
      userType: string;
      createdOn: string;
      status: 'active' | 'deleted';
    }
  ];
}

// success message
export const EVENTCREATED = 'Event Created Successfully!';
export const EVENTUPDATED = 'Event Updated Successfully!';
export const EVENTDELETED = 'Event Deleted Successfully!';

// failure message
export const EVENTNOTCREATED = 'Event Creation Failed!';
export const EVENTNOTUPDATED = 'Event Updation Failed!';
export const EVENTNOTDELETED = 'Event Deletion Failed!';
