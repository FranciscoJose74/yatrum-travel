import { ActionTypes } from './../actions/instagram.action';
import * as TripsActions from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TripsService } from './../services/trips.service';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';

@Injectable() 
export class TripsEffects {
  constructor(private actions$: Actions, private tripsService: TripsService) {}

  @Effect()
  Trips$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LOAD_TRIPS)
    .switchMap<Action, Trip[] | String>(() => this.tripsService.getTrips())
    .map((data: Trip[]) => new TripsActions.TripsLoadedAction(data));

  @Effect()
  UserTrips$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LOAD_USER_TRIPS)
    .switchMap<Action, Trip[] | String>((action: Action) => this.tripsService.getUserTrips(action.payload))
    .map((data: Trip[]) => new TripsActions.UserTripsLoadedAction(data));

  @Effect()
  UserTripIds$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LOAD_USER_TRIPS_SUCCESS)
    .map((action: Action) => new TripsActions.SetUserTripIds(action.payload));

  @Effect()
  SaveTrip$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.SAVE_TRIP)
    .switchMap<Action, Trip | String>((action: Action) => this.tripsService.saveTrip(action.payload))
    .map((data: Trip) => new TripsActions.SaveTripSuccessAction(data));

  @Effect()
  UpdateTrip$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.UPDATE_TRIP)
    .switchMap<Action, Trip>((action: Action) => this.tripsService.updateTrip(action.payload))
    .map((data) => new TripsActions.UpdateTripSuccessAction(data));

  @Effect()
  SearchTrips$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.SEARCH_TRIPS)
    .switchMap<Action, Trip[] | String>((searchQuery) => this.tripsService.searchTrips(searchQuery))
    .map((data: Trip[]) => new TripsActions.TripsLoadedAction(data));

  @Effect()
  LikeTrip$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LIKE_TRIP)
    .switchMap<Action, Trip>((action) => this.tripsService.likeTrip(action.payload))
    .map((data) => new TripsActions.UpdateTripSuccessAction(data));

}