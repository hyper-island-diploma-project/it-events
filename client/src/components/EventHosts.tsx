import { FC } from 'react';
import EventModel from '../models/EventModel';

import { API_URL } from '../utils/utils';

const BASE_URL = API_URL;

interface EventHostsProps {
  event: EventModel;
}

const EventHosts: FC<EventHostsProps> = ({ event }) => {
  const hosts = event.hosts;

  const hostImgOne =
    hosts && hosts.length > 0 ? hosts[0].image : 'Host image not found';

    const hostImgTwo =
    hosts && hosts.length > 0 ? hosts[1].image : 'Host image not found';

    const hostImgThree =
    hosts && hosts.length > 0 ? hosts[2].image : 'Host image not found';

  return (
    <section className="">
      <h2>Event hosts</h2>
      <ul className="grid grid-cols-3 grid-rows-1 gap-12">
        <li className="flex w-52 flex-col gap-y-3">
          <div className="relative flex">
            <img
              src={`${BASE_URL}/${hostImgOne}`}
              alt="Host"
              className="h-[159px] w-full object-cover object-top"
            />
            <div className="absolute bottom-0 h-2/3 w-12 bg-white"></div>
            <div className="absolute right-0 h-1/2 w-8 bg-white"></div>
          </div>

          <div className="flex flex-col gap-y-3 px-3">
            <p className="text-[16px] font-medium">
              {hosts && hosts.length > 0
                ? hosts[0].first_name
                : 'Host name not found'}
              <span className="ml-[2px]">
                {hosts && hosts.length > 0
                  ? hosts[0].last_name
                  : 'Host name not found'}
              </span>
            </p>
            <p className="text-[14px]">
              {hosts && hosts.length > 0
                ? hosts[0].job_title
                : 'Host job not found'}
            </p>
            <p className="text-[14px] text-stone-400">
              {hosts && hosts.length > 0
                ? hosts[0].about
                : 'Host about not found'}
            </p>
          </div>
        </li>

        <li className="flex w-52 flex-col gap-y-3">
          <div className="relative flex">
            <img
              src={`${BASE_URL}/${hostImgTwo}`}
              alt="Host"
              className="h-[159px] w-full object-cover object-top"
            />
            <div className="absolute h-2/3 w-12 bg-white"></div>
            <div className="absolute bottom-0 right-0 h-1/2 w-8 bg-white"></div>
          </div>

          <div className="flex flex-col gap-y-3 px-6">
            <p className="text-[16px] font-medium">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[1].first_name
                : 'Host name not found'}
              <span className="ml-[2px]">
                {' '}
                {hosts && hosts.length > 0
                  ? hosts[1].last_name
                  : 'Host name not found'}
              </span>
            </p>
            <p className="text-[14px]">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[1].job_title
                : 'Host job not found'}
            </p>
            <p className="text-[14px] text-stone-400">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[1].about
                : 'Host about not found'}
            </p>
          </div>
        </li>

        <li className="flex w-52 flex-col gap-y-3">
          <div className="relative flex">
            <img
              src={`${BASE_URL}/${hostImgThree}`}
              alt="Host"
              className="h-[159px] w-full object-cover object-top"
            />
            <div className="absolute h-1/2 w-12 bg-white"></div>
            <div className="absolute bottom-0 right-0 h-2/3 w-8 bg-white"></div>
          </div>

          <div className="flex flex-col gap-y-3 px-6">
            <p className="text-[16px] font-medium">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[2].first_name
                : 'Host name not found'}
              <span className="ml-[2px]">
                {' '}
                {hosts && hosts.length > 0
                  ? hosts[2].last_name
                  : 'Host name not found'}
              </span>
            </p>
            <p className="text-[14px]">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[2].job_title
                : 'Host job not found'}
            </p>
            <p className="text-[14px] text-stone-400">
              {' '}
              {hosts && hosts.length > 0
                ? hosts[2].about
                : 'Host about not found'}
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default EventHosts;
