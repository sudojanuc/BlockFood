import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, tap, filter } from 'rxjs/operators';
import { ContractService } from '../services/contract.service';
import { fetchAddressType, fetchRestaurantsType, setAddress, setRestaurants } from './app.actions';

@Injectable()
export class AppEffects {

    fetchRestaurants$ = createEffect(() => this.actions$.pipe(
        ofType(fetchRestaurantsType),
        mergeMap(() => from(this.contractService.getAllRestaurents())
            .pipe(
                map(restaurants => setRestaurants({restaurants: restaurants})),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchAddress$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAddressType),
        mergeMap(() => from(this.contractService.provider.getSigner().getAddress()())
            .pipe(
                map((address) => setAddress({address: (address as string) })),
                catchError(() => EMPTY)
            ))
    )
    );

    // fetchMyRestaurant$ = createEffect(() => this.actions$.pipe(
    //     ofType(fetchMyRestaurantType),
    //     mergeMap(() => from(this.contractService.getRestaurant())
    //         .pipe(
    //             filter(restaurant => restaurant[0].isCreated),
    //             map(restaurant => setMyRestaurant({restaurant: restaurant[0]})),
    //             catchError(() => EMPTY)
    //         ))
    // )
    // );

    constructor(
        private actions$: Actions,
        private contractService: ContractService
    ) { }
}