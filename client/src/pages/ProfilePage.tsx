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
        const eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) {
          console.warn('Invalid date format:', event.date);
          return false;
        }
        return eventDate.getTime() >= now.getTime();
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    const completedEvents = registeredEvents
      ?.filter((event) => new Date(event.date).getTime() < now.getTime())
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    setUpcomingEvents(futureEvents ?? []);
    setPastEvents(completedEvents ?? []);
  }, [registeredEvents]);

  return (
    <div className="py-6">
      <p className="pageName">Profile</p>
      {currentUser ? (
        <>
          <HeroProfile user={currentUser} upcomingEvents={upcomingEvents} />
          <UserEvents upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default ProfilePage;
