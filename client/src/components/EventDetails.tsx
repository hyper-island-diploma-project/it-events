import React from 'react';
import EventModel from '../models/EventModel';
import { formatInTimeZone } from 'date-fns-tz';

interface EventDetailsProps {
  event: EventModel;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const info = event.info;
  const address =
    info && info.length > 0 ? info[0].address : 'No address available';
  const requirements =
    info && info.length > 0
      ? info[0].requirements
      : 'No requirements available';

  const eventDate = new Date(event.date);
  const formattedDate = formatInTimeZone(eventDate, 'UTC', 'MMMM d, yyyy');

  const formatInfo = () => {
    if (!event.format_online && !event.format_onsite) {
      return null;
    }
    if (event.format_online && event.format_onsite) {
      return (
        <div>
          {event.city}, {address}.
          <p className="mt-2">
            Also, you can join online — we will send a link to the broadcast to
            everyone who is registered.
          </p>
        </div>
      );
    }
    if (event.format_online && !event.format_onsite) {
      return <p>Online</p>;
    }
    if (!event.format_online && event.format_onsite) {
      return (
        <div>
          {event.city}, {address}.
        </div>
      );
    }
  };

  return (
    <ul className="my-12 grid grid-cols-[450px_200px_1fr] gap-10 border-b border-t border-dashed border-black pb-4 pt-10">
      <li>
        <p className="mb-3 text-xl">
          <span className="mr-3 font-medium">01/</span>Where:
        </p>
        <p className="flex flex-col text-lg font-[300]">
          {formatInfo()}
        </p>
      </li>
      <li>
        <p className="mb-3 text-xl">
          <span className="mr-3 font-medium">02/</span>When:
        </p>
        <p className="text-lg font-[300]">{formattedDate}</p>
      </li>
      <li>
        <p className="mb-3 text-xl">
          <span className="mr-3 font-medium">03/</span>How:
        </p>
        <p className="text-lg font-[300]">{requirements}</p>
      </li>
    </ul>
  );
};

export default EventDetails;
