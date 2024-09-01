type InfoItem = {
  id: number;
  description: string;
  address: string;
  requirements: string;
  eventId: number;
};

type Hosts = {
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  about: string;
  image: string;
};

type AgendaItem = {
  id: number;
  time: string;
  title: string;
  subtitle: string | null;
  is_rest: boolean;
  speaker_name: string | null;
  speaker_job: string | null;
  speaker_about: string | null;
};

type Agenda = {
  agenda: AgendaItem[];
};

type EventModel = {
  id?: number | null;
  eventId?: number | null;
  title: string;
  city?: string;
  format_online: boolean;
  format_onsite: boolean;
  date: string;
  topic: string;
  available_seats?: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  info?: InfoItem[];
  hosts?: Hosts[];
  agenda?: Agenda[];
  keywords: [];
  isSaved?: boolean;
};

export default EventModel;
