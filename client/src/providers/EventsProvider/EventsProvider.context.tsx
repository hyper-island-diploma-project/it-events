/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import EventModel from '../../models/EventModel';
import UserEventModel from '../../models/UserEventModel';
import EventUserCountsModel from '../../models/EventUserCountsModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  allEvents: EventModel[] | undefined;
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
  getOneEvent: (id: string) => Promise<EventModel | null>;
  getRegisteredEvents: (userId: number|null) => void;
  registeredEvents: UserEventModel[] | undefined;
  unregisterEvent: (userId: number, eventId: number) => void;
  getUsersSubscriptions: () => void;
  eventUserCounts: EventUserCountsModel[];
  registerEvent: (data: UserEventModel) => void;
  cleanRegisteredEvents:()=> void;
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  upcomingEvents: [],
  pastEvents: [],
  allEvents: undefined,
  getOneEvent: (id: string) => new Promise((resolve) => resolve(null)),
  getRegisteredEvents: () => null,
  registeredEvents: undefined,
  unregisterEvent: () => null,
  getUsersSubscriptions: () => null,
  eventUserCounts: [],
  registerEvent: () => null,
  cleanRegisteredEvents:()=> null
});

export default EventsContext;
