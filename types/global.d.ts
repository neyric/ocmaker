declare interface UserInfo {
  email: string;
  name: string;
  user_name: string | null;
  avatar: string | null;
  bio: string | null;
  invite_code: string | null;
  created_at: number;
}

declare interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}
