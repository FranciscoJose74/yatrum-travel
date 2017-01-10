import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/user-auth.action';
import { Action } from '@ngrx/store';
import { UserProfile } from './../models/user-profile';

export interface State {
  user_profile: UserProfile;
  auth: any;
  selected_user_profile: UserProfile;
}

const initialState = {
  //TODO: Provision this dummy object creation to user_profile model
  user_profile: { 
    id: null,
    name: null,
    email: null,
    profilePic: null,
    coverPhoto: null,
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
      token: null,
      created_at: null,
      updated_at: null
    }
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in success');
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false,
        selected_user_profile: state.selected_user_profile
      }
    }
    // Authentication with rails api backend
    case ActionTypes.SERVER_LOGIN_SUCCESS: {
      console.log('in server login success');
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case ActionTypes.SERVER_LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false,
        selected_user_profile: state.selected_user_profile
      }
    }
    case ActionTypes.USER_UPDATE_SUCCESS: {
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case ActionTypes.SELECTED_PROFILE_USER: {
      window['payload'] = action.payload;
      return {
        user_profile: state.user_profile,
        auth: state.auth,
        selected_user_profile: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

//========================= Exporter functions -==================================
export function getUserProfile (state$: Observable<State>): Observable<UserProfile> {
  return state$.select(state => state.user_profile);
}

export function getLoggedInUserId(state$: Observable<State>): Observable<string> {
  return state$.select(state => state.user_profile.id);
} 

export function getAuthStatus (state$: Observable<State>): Observable<any> {
  return state$.select(state => state.auth);
}

export function getSelectedProfileUser (state$: Observable<State>): Observable<UserProfile> {
  return state$.select(state => state.selected_user_profile);
}