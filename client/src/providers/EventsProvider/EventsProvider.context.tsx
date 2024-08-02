import { createContext } from 'react';
import EventModel from '../../models/EventModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  upcomingEvents: [],
  pastEvents: [],
});

export default EventsContext;
