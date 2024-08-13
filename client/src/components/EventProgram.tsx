import { FC } from 'react';
import EventModel from '../models/EventModel';
import EventProgramItem from './EventProgramItem';

interface EventProgramProps {
  event: EventModel;
}

const EventProgram: FC<EventProgramProps> = ({ event }) => {
  const agenda = event.agenda;

  return (
    <section className="my-12">
      <h2>Event program</h2>
      <ul className=' flex flex-col gap-6 justify-center'>
        {agenda?.length ? (
          agenda.map((item, index) => (
            <EventProgramItem key={index} item={item} />
          ))
        ) : (
          <p>No program</p>
        )}
      </ul>
    </section>
  );
};

export default EventProgram;
