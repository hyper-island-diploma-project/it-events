import React, { useEffect, useState } from 'react';
import EventModel from '../models/EventModel';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';

interface EventFormatProps {
  event: EventModel;
}

const EventFormat: React.FC<EventFormatProps> = ({ event }) => {
  const { eventUserCounts } = useEvents();
  const [availablePlace, setAvailablePlace] = useState<number | null>(null);

  useEffect(() => {
    const getAvailablePlace = () => {
      if (event.available_seats === 0) {
        setAvailablePlace(null);
        return;
      }

      const currenEventUser = eventUserCounts.find(
        (item) => item.eventId === event.id,
      );

      if (currenEventUser) {
        setAvailablePlace(event.available_seats - currenEventUser.userCount);
      } else {
        setAvailablePlace(event.available_seats);
      }
    };

    getAvailablePlace();
  }, [event, eventUserCounts]);

  const onlineFormat = () => {
    if (!event.format_online) {
      return null;
    }
    return (
      <div className="mr-3 flex items-center">
        <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
        <p>Online</p>
      </div>
    );
  };

  const onsiteFormat = () => {
    if (!event.format_onsite) {
      return null;
    }
    return (
      <div className="mr-3 flex items-center">
        <div className="mr-1 h-2 w-2 rounded-full bg-red-600"></div>
        <p>{event.city}</p>
      </div>
    );
  };

  const amountOfPlaces = () => {
    if (event.available_seats === 0) {
      return null;
    }
    return (
      <div className="flex items-center">
        <div className="mr-1 h-2 w-2 rounded-full bg-orange-600"></div>
        <p>
          {/* <span>{event.available_seats}</span> places left */}
          <span>{availablePlace}</span> places left
        </p>
      </div>
    );
  };

  return (
    <div className="flex">
      {onsiteFormat()}
      {onlineFormat()}
      {amountOfPlaces()}
    </div>
  );
};

export default EventFormat;
