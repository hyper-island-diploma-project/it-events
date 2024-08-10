import React from 'react';
import EventModel from '../models/EventModel';

interface EventFormatProps {
  event: EventModel;
}

const EventFormat: React.FC<EventFormatProps> = ({ event }) => {
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
          <span>{event.available_seats}</span> places left
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
