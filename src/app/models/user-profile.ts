import { Base } from './base';

export interface UserProfile extends Base {
  name: string;
  email: string;
  photoURL: string;
  token: string;
}
