import { useState, FC, ReactNode, useEffect } from 'react';
import EventsProviderContext from './EventsProvider.context';
import EventModel from '../../models/EventModel';
import * as eventApi from '../../api/eventApi';
import * as userEventApi from '../../api/userEventsApi';

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allSourceEvents, setAllSourceEvents] = useState<EventModel[]>();
  const [allEvents, setAllEvents] = useState<EventModel[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<EventModel[] | []>();
  // const [currentEvent, setCurrentEvent] = useState<EventModel | undefined>(undefined);

  const getAllEvents = async () => {
    try {
      const data = await eventApi.getEventList();
      setAllSourceEvents(data);
      // return data;
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (!allSourceEvents) return;

    const updatedEventList = allSourceEvents.map((event: EventModel) => ({
      ...event,
      isSaved:
        registeredEvents &&
        registeredEvents.some((userEvent) => userEvent.eventId === event.id),
    }));
    setAllEvents(updatedEventList);
    console.log(allEvents);
  }, [registeredEvents, allSourceEvents]);

  useEffect(() => {
    const now = new Date();

    const futureEvents = allEvents
      ?.filter((event) => {
        const eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) {
          console.warn('Invalid date format:', event.date);
          return false;
        }
        return eventDate.getTime() >= now.getTime();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastEvents = allEvents
      ?.filter((event) => new Date(event.date).getTime() < now.getTime())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setUpcomingEvents(futureEvents ?? []);
    setPastEvents(pastEvents ?? []);
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

  const getRegisteredEvents = (userId: number) => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      userEventApi
        .fetchAllUserEvent(userId, tokenFromLocalStorage)
        .then((res) => {
          const updatedEventList = res.map((item: EventModel) => ({
            // ...event,
            // isSaved: true,
            ...item.event, // Разворачиваем данные события на верхнем уровне
            eventId: item.eventId, // Сохраняем идентификатор события
            id: item.id, // Сохраняем оригинальный идентификатор записи
            userId: item.userId, // Сохраняем идентификатор пользователя
            isSaved: true,
          }));
          setRegisteredEvents(updatedEventList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const unregisterEvent = (id: number) => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      userEventApi
        .unregisterEvent(id, tokenFromLocalStorage)
        .then(() => {
          setRegisteredEvents((prevEvents) => {
            prevEvents.filter((event) => event.id !== id);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const value = {
    getAllEvents,
    allEvents,
    upcomingEvents,
    pastEvents,
    getOneEvent,
    getRegisteredEvents,
    registeredEvents,
    unregisterEvent,
  };

  return (
    <EventsProviderContext.Provider value={value}>
      {children}
    </EventsProviderContext.Provider>
  );
};
export default EventsProvider;
