declare type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
} & DatabaseFields;
export type LoginResponse = {
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
  };
};

export type VerifyOpt = {
  message: 'success';
};

export type forgotPasswordResponse = {
  info: string;
};

export type NewPasswordResponse = {
  token: string;
};
