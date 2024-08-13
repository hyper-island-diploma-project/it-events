import { FC } from 'react';
import AgendaItem from '../models/EventModel';

interface EventProgramItemProps {
  item: AgendaItem;
}

const EventProgramItem: FC<EventProgramItemProps> = ({ item }) => {
  const subtitle = () => {
    if (item.subtitle === null) {
      return null;
    } else {
      return <p className="mt-4 text-sm text-stone-700">{item.subtitle}</p>;
    }
  };

  const speaker = () => {
    if (item.speaker_name === 0) {
      return null;
    } else {
      return (
        <div className="flex w-[250px] flex-col gap-2">
          <p className="text-[16px] font-medium">{item.speaker_name}</p>
          <p className="text-sm">{item.speaker_job}</p>
          <p className="text-sm text-stone-400">{item.speaker_about}</p>
        </div>
      );
    }
  };

  const slot = () => {
    if (item.is_rest) {
      return (
        <div className=' flex relative'>
          <p className="rounded-full bg-amber-600 px-6 py-2 text-white">
            {item.title}
          </p>
          <img src="/rest-star.svg" alt="rest star logo" className=' absolute -right-3 -top-3' />
        </div>
      );
    } else {
      return (
        <p className="rounded-full bg-blueAccent px-6 py-2 text-white">
          {item.title}
        </p>
      );
    }
  };

  return (
    <li className="grid grid-cols-[50px_1fr_1fr] gap-8">
      <p className="py-2 text-lg font-medium">{item.time}</p>
      <div className="flex w-fit flex-col text-[16px]">
        {slot()}
        {subtitle()}
      </div>
      {speaker()}
    </li>
  );
};

export default EventProgramItem;
