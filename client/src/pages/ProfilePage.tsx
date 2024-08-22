import useUser from '../providers/UserProvider/UserProvider.hook';
import HeroProfile from '../components/HeroProfile';
import UserEvents from '../components/UserEvents';
import { useEffect, useState } from 'react';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import EventModel from '../models/EventModel';

function ProfilePage() {
  const { currentUser, checkToken } = useUser();
  const { registeredEvents, getRegisteredEvents } = useEvents();

  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    if (registeredEvents || !currentUser?.id) return;
    getRegisteredEvents(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const now = new Date();

    const futureEvents = registeredEvents
      ?.filter((event) => {
        const eventDate = new Date(event.event.date);
        if (isNaN(eventDate.getTime())) {
          console.warn('Invalid date format:', event.event.date);
          return false;
        }
        return eventDate.getTime() >= now.getTime();
      })
      .sort(
        (a, b) =>
          new Date(a.event.date).getTime() - new Date(b.event.date).getTime(),
      );

    const completedEvents = registeredEvents
      ?.filter((event) => new Date(event.event.date).getTime() < now.getTime())
      .sort(
        (a, b) =>
          new Date(a.event.date).getTime() - new Date(b.event.date).getTime(),
      );

    setUpcomingEvents(futureEvents ?? []);
    setPastEvents(completedEvents ?? []);
  }, [registeredEvents]);

  return (
    <>
      <p className="pageName">Profile</p>
      {currentUser ? (
        <>
          <HeroProfile user={currentUser} upcomingEvents={upcomingEvents} />
          <UserEvents upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        </>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
}

export default ProfilePage;
