type InfoItem = {
  id: number;
  description: string;
  address: string;
  requirements: string;
  createdAt: string;
  updatedAt: string;
  eventId: number;
};

type EventModel = {
  id: number | null;
  title: string;
  city?: string;
  format_online: boolean;
  format_onsite: boolean;
  date: string;
  topic: string;
  available_seats?: number;
  bg_color: '#1D6BF3' | '#000000' | '#FFFFFF';
  text_color?: '#000000' | '#FFFFFF';
  image: string;
  createdAt?: string;
  updatedAt?: string;
  info?: InfoItem[];
  // description?: string;
};


export default EventModel;
