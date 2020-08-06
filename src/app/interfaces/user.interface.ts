export interface UserAuth {
  name: string;
  pass?: string;
  id?: string;
  authtoken?: string;
  logoutToken?: string;
  csrfToken?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  mail: string;
  roles?: string[];
  avatarUrl?: string;
}
