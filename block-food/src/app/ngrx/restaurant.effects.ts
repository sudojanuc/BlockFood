import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, tap, filter } from 'rxjs/operators';
import { ContractService } from '../services/contract.service';
import { fetchMyRestaurantType, fetchRestaurantsType, setMyRestaurant, setRestaurants } from './restaurant.actions';

@Injectable()
export class RestaurantEffects {

    fetchRestaurants$ = createEffect(() => this.actions$.pipe(
        ofType(fetchRestaurantsType),
        mergeMap(() => from(this.contractService.getAllRestaurents())
            .pipe(
                tap((v) => console.log(v)),
                map(restaurants => setRestaurants({restaurants: restaurants[0]})),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchMyRestaurant$ = createEffect(() => this.actions$.pipe(
        ofType(fetchMyRestaurantType),
        mergeMap(() => from(this.contractService.getRestaurant())
            .pipe(
                filter(restaurant => restaurant[0].isCreated),
                map(restaurant => setMyRestaurant({restaurant: restaurant[0]})),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private contractService: ContractService
    ) { }
}