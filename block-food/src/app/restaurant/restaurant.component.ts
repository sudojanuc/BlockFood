import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant';
import { createRestaurantType, createTableType } from '../ngrx/app.actions';
import { selectMyRestaurant, selectRestaurantsLoading, selectTablesLoading, selectTablesOfRestaurant } from '../ngrx/app.reducer';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  name: string = '';
  chairs: number = 0;
  isLoading: boolean = true;
  myRestaurant$ = this.store.pipe(
    select(selectMyRestaurant)
  );

  restaurantsLoading$ = this.store.pipe(
    select(selectRestaurantsLoading)
  );

  tablesLoading$ = this.store.pipe(
    select(selectTablesLoading)
  );

  myTables$ = this.store.pipe(
    select(selectMyRestaurant),
    switchMap(myRestaurant => this.store.pipe(select(selectTablesOfRestaurant(myRestaurant))))
  );



  constructor(private contractService: ContractService,
    private store: Store) { }

  ngOnInit(): void {

  }

  public saveRestaurant() {
    this.store.dispatch({type: createRestaurantType, payload:{
      name: this.name
    } })
  }

  public saveTable(restaurant: Restaurant) {
    this.store.dispatch({type: createTableType, payload:{
      restaurant: restaurant,
      guestCount: this.chairs
    } })

    // this.contractService.saveTable(restaurant, this.chairs);
  }

}

