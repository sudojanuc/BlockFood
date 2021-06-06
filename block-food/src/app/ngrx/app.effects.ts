import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, tap, filter } from 'rxjs/operators';
import { ContractService } from '../services/contract.service';
import { fetchAddressType, fetchReservationsType, fetchRestaurantsType, fetchTablesType, setAddress, setReservations, setRestaurants, setTables } from './app.actions';

@Injectable()
export class AppEffects {

    fetchRestaurants$ = createEffect(() => this.actions$.pipe(
        ofType(fetchRestaurantsType),
        mergeMap(() => from(this.contractService.getAllRestaurents())
            .pipe(
                tap(res =>console.log(res)),
                map(restaurants => setRestaurants({restaurants: restaurants})),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchAddress$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAddressType),
        mergeMap(() => from(this.contractService.provider.getSigner().getAddress())
            .pipe(
                map((address) => setAddress({address: (address as string) })),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchTables$ = createEffect(() => this.actions$.pipe(
        ofType(fetchTablesType),
        mergeMap(() => from(this.contractService.getAllTables())
            .pipe(
                // tap(console.log),
                map(tables => setTables({tables: tables})),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchReservations$ = createEffect(() => this.actions$.pipe(
        ofType(fetchReservationsType),
        mergeMap(() => from(this.contractService.getAllReservations())
            .pipe(
                tap(v => console.log('reservations: ', v)),
                map(reservations => setReservations({reservations: reservations})),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private contractService: ContractService
    ) { }
}