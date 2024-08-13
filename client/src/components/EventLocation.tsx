import React from 'react';
import EventModel from '../models/EventModel';

interface EventLocationProps {
  event: EventModel;
}

const EventLocation: React.FC<EventLocationProps> = ({ event }) => {
  const info = event.info;
  const address =
    info && info.length > 0 ? info[0].address : 'No address available';

  const locationSection = () => {
    if (
      (event.format_onsite && event.format_online) ||
      (event.format_onsite && !event.format_online)
    ) {
      return (
        <section>
          <h2>Location</h2>
          <div className="grid grid-cols-[1fr_auto] items-center gap-6">
            <div className="relative flex h-[150px] w-[450px] items-center justify-center">
              <img
                src="/location-circle.svg"
                alt="location circle"
                className="absolute w-full"
              />
              <p className="max-w-[420px] text-center text-xl">📍 {address}</p>
            </div>
            <img src="/map.png" alt="map" className="" />
          </div>
        </section>
      );
    } else {
      return null;
    }
  };

  return <>{locationSection()}</>;
};

export default EventLocation;
