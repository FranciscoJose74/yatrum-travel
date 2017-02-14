import { Subscription } from 'rxjs/Rx';
import { UserAuthService } from './../../../services/user-auth.service';
import { FollowUserAction } from './../../../actions/user.action';
import { LikeTripAction } from './../../../actions/trips.action';
import { Trip } from './../../../models/trip';
import { UserProfile } from './../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit, OnDestroy {
  trip$: Observable<any>;
  loggedInUser$: Observable<UserProfile>;
  trip: Trip;
  userTrip: boolean;
  user: any = {};
  tripSubs: Subscription;
  loggedSubs: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: UserAuthService) {
    this.trip$ = this.store.select(fromRoot.getSelectedTrip);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);
  }

  ngOnInit() {
    this.tripSubs = this.trip$.subscribe(trip => {
      this.trip = trip;
      this.user = trip.user;
    });
    
    this.loggedSubs = this.loggedInUser$.subscribe(user => {
      if (user.id === this.trip.user.id) {
        this.userTrip = true;
      } else {
        this.userTrip = false;
      }
    })
  }

  tripFollowState() {
    return this.trip.user.is_followed_by_current_user ? 'active' : 'inactive';
  }

  tripLikeState() {
    return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  }

  onToggleFollow() {
    this.store.dispatch(new FollowUserAction(this.trip.user_id))
  }  

  onToggleLike() {
    this.store.dispatch(new LikeTripAction(this.trip.id));
    // this.trip.is_liked_by_current_user = !this.trip.is_liked_by_current_user;
  }

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.trip.user_id)
  }

  ngOnDestroy() {
    this.tripSubs.unsubscribe();
    this.loggedSubs.unsubscribe();
  }

}
