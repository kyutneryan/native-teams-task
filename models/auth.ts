export interface LogInReqData {
  email: string;
  password: string;
}

export interface LogInResData {
  auth: {
    access_token: string;
    access_token_expire: string;
    refresh_token: string;
    refresh_token_expire: string;
  };
}
