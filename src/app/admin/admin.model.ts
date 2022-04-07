export interface Users {
  status: string;
  message: string;
  data:
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
    }[]
}

export interface EventData {
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
}

// success message
export const EVENTCREATED = 'Event Created Successfully!';
export const EVENTUPDATED = 'Event Updated Successfully!';
export const EVENTDELETED = 'Event Deleted Successfully!';

// failure message
export const EVENTNOTCREATED = 'Event Creation Failed!';
export const EVENTNOTUPDATED = 'Event Updation Failed!';
export const EVENTNOTDELETED = 'Event Deletion Failed!';

// dialog data
export const DELETEEVENTCONFIRMATION = 'Are you sure you want to delete the event - '
export const DELETEEVENT = 'Delete Event'

export const UPDATE = 'update'
export const CREATE = 'create'