import { useState, FC, ReactNode, useEffect } from 'react';
import EventsProviderContext from './EventsProvider.context';
import EventModel from '../../models/EventModel';
import * as eventApi from '../../api/eventApi';

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [eventList, setEventList] = useState<EventModel[]>([]);

  // const getAllEvents = () => {
  //   eventApi.getEventList().then((data) => {
  //     setEventList(data);
  //   });
  // };

  const [allEvents, setAllEvents] = useState<EventModel[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);
  // const [currentEvent, setCurrentEvent] = useState<EventModel | undefined>(undefined);

  const getAllEvents = async () => {
    try {
      const data = await eventApi.getEventList();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (allEvents.length === 0) {
      getAllEvents().then((data) => setAllEvents(data));
    }
  }, [allEvents]);

  useEffect(() => {
    const now = new Date();

    const futureEvents = allEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) {
          console.warn('Invalid date format:', event.date);
          return false;
        }
        return eventDate.getTime() >= now.getTime();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastEvents = allEvents
      .filter((event) => new Date(event.date).getTime() < now.getTime())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setUpcomingEvents(futureEvents);
    setPastEvents(pastEvents);
  }, [allEvents]);

  const getOneEvent = async (id: number) => {
    try {
      const event = await eventApi.getEventById(id);
      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  };


  const value = {
    getAllEvents,
    upcomingEvents,
    pastEvents,
    getOneEvent,
    // currentEvent,
  };

  return (
    <EventsProviderContext.Provider value={value}>
      {children}
    </EventsProviderContext.Provider>
  );
};
export default EventsProvider;
