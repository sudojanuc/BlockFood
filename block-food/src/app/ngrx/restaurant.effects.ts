import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ContractService } from '../services/contract.service';
import { fetchRestaurantsType, setRestaurants } from './restaurant.actions';

@Injectable()
export class RestaurantEffects {

    fetchRestaurants$ = createEffect(() => this.actions$.pipe(
        ofType(fetchRestaurantsType),
        mergeMap(() => from(this.contractService.getAllRestaurents())
            .pipe(
                map(restaurants => setRestaurants({restaurants: restaurants[0]})),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private contractService: ContractService
    ) { }
}