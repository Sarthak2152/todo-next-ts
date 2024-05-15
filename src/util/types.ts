export type Todo = {
  _id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
};

export type JwtPayload = {
  userId: string;
  email: String;
};
