import { createContext } from 'react';
import EventModel from '../../models/EventModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
  getOneEvent: () => void;
  // currentEvent: EventModel | undefined;
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  upcomingEvents: [],
  pastEvents: [],
  getOneEvent: () => null,
  // currentEvent: undefined,
});

export default EventsContext;
