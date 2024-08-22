/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import EventModel from '../../models/EventModel';
import UserEventModel from '../../models/UserEventModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  allEvents: EventModel[]|undefined;
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
  getOneEvent: (id: string) => Promise<EventModel | null>;
  getRegisteredEvents: (userId: number) => void;
  registeredEvents: UserEventModel[] | undefined; // currentEvent: EventModel | undefined;
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  upcomingEvents: [],
  pastEvents: [],
  allEvents: undefined,
  getOneEvent: (id: string) => new Promise((resolve) => resolve(null)),
  getRegisteredEvents: () => null,
  registeredEvents: undefined,
  // currentEvent: undefined,
});

export default EventsContext;
