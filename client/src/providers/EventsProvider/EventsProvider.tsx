import { useState, FC, ReactNode, useEffect } from 'react';
import EventsProviderContext from './EventsProvider.context';
import EventModel from '../../models/EventModel';
import * as eventApi from '../../api/eventApi';

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);

  const getAllEvents = () => {
    eventApi.getEventList().then((data) => {
      setEventList(data);
    });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const value = {
    getAllEvents,
    eventList,
  };

  return (
    <EventsProviderContext.Provider value={value}>
      {children}
    </EventsProviderContext.Provider>
  );
};
export default EventsProvider;
