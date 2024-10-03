type TUserCredentials = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
};

type TCookieCredentials = {
  access_token: string;
  role: string;
};

export type { TUserCredentials, TCookieCredentials };
