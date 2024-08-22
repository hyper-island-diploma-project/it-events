type UserEventModel = {
  id?: number;
  userId: number | null;
  eventId: number | null;
  isSaved: boolean;
};

export default UserEventModel;
