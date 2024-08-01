import { useContext } from 'react';
import EventsProviderContext, {IEventsProvider} from './EventsProvider.context'

const useEventsList = (): IEventsProvider => {
  return useContext(EventsProviderContext);
};

export default useEventsList;