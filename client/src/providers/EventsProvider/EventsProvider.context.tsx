/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import EventModel from '../../models/EventModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
  getOneEvent: (id: string) => Promise<EventModel | null>;
  // currentEvent: EventModel | undefined;
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  upcomingEvents: [],
  pastEvents: [],
  getOneEvent: (id: string) => new Promise((resolve) => resolve(null)),
  // currentEvent: undefined,
});

export default EventsContext;
