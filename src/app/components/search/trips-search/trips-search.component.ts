import { Router } from '@angular/router';
import { LoadTripsAction, SearchTrip } from './../../../actions/trips.action';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/core';
import * as fromRoot from './../../../reducers/index';

@Component({
  selector: 'tr-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.scss'],
  animations: [
    trigger('flyInDown', [
      state('in', style({ })),
      transition('void => *', [
        style({ top: "-5%", opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class TripsSearchComponent {

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {
  }

  onSearch(searchQuery){
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery))
    else
      this.store.dispatch(new LoadTripsAction({page: 1}))
  }

}
