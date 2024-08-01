import { createContext } from 'react';
import EventModel from '../../models/EventModel';

export interface IEventsProvider {
  getAllEvents: () => void;
  eventList: EventModel[],
}

const EventsContext = createContext<IEventsProvider>({
  getAllEvents: () => null,
  eventList: [],
});

export default EventsContext;
