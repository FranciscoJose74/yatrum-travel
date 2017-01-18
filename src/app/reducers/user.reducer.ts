import { ActionTypes as UserActions } from './../actions/user.action';
import { Trip } from './../models/trip';
import { ActionTypes as tripActions } from './../actions/trips.action';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as userAuthActions } from './../actions/user-auth.action';
import { Action } from '@ngrx/store';
import { UserProfile } from './../models/user-profile';

export interface State {
  user_profile: UserProfile;
  auth: any;
  selected_user_profile: UserProfile;
  followers: Array<UserProfile>;
  following: Array<UserProfile>;
}

const initialState = {
  //TODO: Provision this dummy object creation to user_profile model
  user_profile: { 
    id: null,
    name: null,
    email: null,
    profilePic: null,
    coverPhoto: null,
    isFollowed: null,
    tripIds: [],
    token: null,
    created_at: null,
    updated_at: null
  },
    auth: null,
    selected_user_profile: { 
      id: null,
      name: null,
      email: null,
      profilePic: null,
      coverPhoto: null,
      isFollowed: null,
      tripIds: [],
      token: null,
      created_at: null,
      updated_at: null
    },
    followers: null,
    following: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case userAuthActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      });
    }
    case userAuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: initialState.user_profile,
        auth: false
      });
    }
    // Authentication with rails api backend
    case userAuthActions.SERVER_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      })
    }
    case userAuthActions.SERVER_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: initialState.user_profile,
        auth: false
      })
    }
    case userAuthActions.USER_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      })
    }
    case userAuthActions.SELECTED_PROFILE_USER: {
      return Object.assign({}, state, {
        selected_user_profile: action.payload
      })
    }
		case tripActions.SET_USER_TRIP_IDS: {
      const trips = action.payload;
      const trip_ids = trips.map(trip => trip.id);

      return Object.assign({}, state, {
        selected_user_profile: Object.assign({}, state.selected_user_profile, {
          tripIds: [...state.selected_user_profile.tripIds, ...trip_ids]
        })
      })
		}
    case UserActions.USER_FOLLOWERS_LOADED: {
      return Object.assign({}, state, {
        followers: action.payload
      })
    }
    case UserActions.USER_FOLLOWING_LOADED: {
      return Object.assign({}, state, {
        following: action.payload
      })
    }
    default: {
      return state;
    }
  }
}

//========================= Exporter functions -==================================
export function getUserProfile (state: State): UserProfile {
  return state.user_profile;
}

export function getLoggedInUserId(state: State): string {
  return state.user_profile.id;
} 

export function getAuthStatus (state: State): any {
  return state.auth;
}

export function getSelectedProfileUser (state: State): UserProfile {
  return state.selected_user_profile;
}

export function getUserTripIds(state: State) {
  return state.selected_user_profile.tripIds;
}

export function getUserFollowers(state: State) {
  return state.followers;
}

export function getUserFollowing(state: State) {
  return state.following;
}