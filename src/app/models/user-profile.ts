import { Trip } from './trip';
import { Base } from './base';

interface TripsState {
	ids: string[];
  trips: { [id: string]: Trip };
}

export class UserProfile extends Base {
  name: string;
  email: string;
  profilePic: Object;
  coverPhoto: Object;
  isFollowed: boolean;
  token: string;
  is_followed_by_current_user: Boolean;
  profile_pic: any;
}
