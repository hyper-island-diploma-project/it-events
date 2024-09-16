import { useState, FC, ReactNode, useEffect } from 'react';
import EventsProviderContext from './EventsProvider.context';
import EventModel from '../../models/EventModel';
import UserEventModel from '../../models/UserEventModel';
import EventUserCountsModel from '../../models/EventUserCountsModel';
import * as eventApi from '../../api/eventApi';
import * as userEventApi from '../../api/userEventsApi';

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allSourceEvents, setAllSourceEvents] = useState<EventModel[]>();
  const [allEvents, setAllEvents] = useState<EventModel[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<EventModel[] | []>();
  const [usersSubscriptions, setUsersSubscriptions] = useState<
    UserEventModel | []
  >([]);
  const [eventUserCounts, setEventUserCounts] = useState<
    EventUserCountsModel | []
  >([]);

  const getAllEvents = async () => {
    try {
      const data = await eventApi.getEventList();
      setAllSourceEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (!allSourceEvents) return;

    const updatedEventList = allSourceEvents.map((event: EventModel) => {
      const savedEvent = registeredEvents
        ? registeredEvents.find((userEvent) => userEvent.eventId === event.id)
        : null;

      return {
        ...event,
        eventId: event.id,
        isSaved: !!savedEvent,
        id: savedEvent?.id || undefined,
      };
    });

    setAllEvents(updatedEventList);
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

  const registerEvent = ({ userId, eventId }: UserEventModel) => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      userEventApi
        .registerEvent({ userId, eventId }, tokenFromLocalStorage)
        .then((res) => {
          const currentEvent = allEvents?.find((ev) => ev.eventId === eventId);
          if (!currentEvent) return;
          const newUserEvent: EventModel = {
            ...currentEvent,
            isSaved: true,
            id: res.id,
          };
          // Добавляем новое событие в список
          setRegisteredEvents((prevEvents) => [...prevEvents, newUserEvent]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const cleanRegisteredEvents = () => {
    setRegisteredEvents(undefined);
  };
  const getRegisteredEvents = (userId: number | null) => {
    if (!userId) {
      // setRegisteredEvents([]);
      return;
    }
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      userEventApi
        .fetchAllUserEvent(userId, tokenFromLocalStorage)
        .then((res) => {
          const updatedEventList = res.map((item: EventModel) => ({
            ...item.event,
            eventId: item.eventId,
            id: item.id,
            userId: item.userId,
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
            return prevEvents.filter((event) => event.id !== id);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUsersSubscriptions = async () => {
    try {
      const subscriptions = await eventApi.getAllUsersSubscriptions();
      setUsersSubscriptions(subscriptions);

      const eventUserCount = subscriptions.reduce(
        (acc, { eventId, userId }) => {
          if (!acc[eventId]) {
            acc[eventId] = new Set();
          }
          acc[eventId].add(userId);
          return acc;
        },
        {},
      );

      const result = Object.entries(eventUserCount).map(([eventId, users]) => ({
        eventId: Number(eventId),
        userCount: users.size,
      }));

      setEventUserCounts(result);
    } catch (error) {
      console.error('Error fetching or processing event user counts:', error);
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
    getUsersSubscriptions,
    eventUserCounts,
    registerEvent,
    cleanRegisteredEvents,
  };

  return (
    <EventsProviderContext.Provider value={value}>
      {children}
    </EventsProviderContext.Provider>
  );
};
export default EventsProvider;
