type UserModel = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  job_title: string;
  workplace: string;
  experience: string;
  image: string;
};

export default UserModel;
