import { useContext } from 'react';
import EventsProviderContext, {IEventsProvider} from './EventsProvider.context'

const useEvents = (): IEventsProvider => {
  return useContext(EventsProviderContext);
};

export default useEvents;