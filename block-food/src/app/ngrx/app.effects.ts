import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, tap, filter, withLatestFrom, switchMap } from 'rxjs/operators';
import { Reservation } from '../models/reservations';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { ContractService } from '../services/contract.service';
import {
    createTableType,
    fetchAddressType,
    fetchReservationsType,
    fetchRestaurantsType,
    fetchTablesType,
    setAddress,
    setReservations,
    setRestaurants,
    setTables,
    setTablesLoading
} from './app.actions';

@Injectable()
export class AppEffects {

    fetchRestaurants$ = createEffect(() => this.actions$.pipe(
        ofType(fetchRestaurantsType),
        mergeMap(() => from(this.contractService.getAllRestaurents())
            .pipe(
                tap(res => console.log(res)),
                map(restaurants => setRestaurants({ restaurants: restaurants })),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchAddress$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAddressType),
        mergeMap(() => from(this.contractService.provider.getSigner().getAddress())
            .pipe(
                map((address) => setAddress({ address: (address as string) })),
                catchError(() => EMPTY)
            ))
    )
    );

    fetchTables$ = createEffect(() => this.actions$.pipe(
        ofType(fetchTablesType),
        mergeMap(() => from(this.contractService.getAllTables())
            .pipe(
                // tap(console.log),
                map(tables => setTables({ tables: tables })),
                catchError(() => EMPTY)
            ))
    )
    );

    createTable$ = createEffect(() => this.actions$.pipe(
        ofType(createTableType),
        switchMap((action: any) =>
            from(this.contractService.saveTable(action.payload.restaurant, action.payload.guestCount))
                .pipe(
                    // tap(console.log),
                    map(() => setTablesLoading({isLoading: true})),
                    catchError(() => EMPTY)
                ))
    )
    );

    fetchReservations$ = createEffect(() => this.actions$.pipe(
        ofType(fetchReservationsType),
        mergeMap(() => from(this.contractService.getAllReservations())
            .pipe(
                tap(v => console.log('reservations: ', v)),
                // map(),
                withLatestFrom(this.store$),
                map(([reservations, store]) =>
                    setReservations({
                        reservations: reservations
                            .map((reservation: Reservation) => {
                                let table: Table = store.data.tables.find((table: Table) =>
                                    table.unitId == reservation.unitKey
                                );
                                let restaurant = store.data.restaurants.find((restaurant: Restaurant) =>
                                    restaurant.providerId == table.providerKey
                                );
                                return {
                                    ...reservation,
                                    restaurant: restaurant,
                                    table: table
                                };
                            })
                    })
                ),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private contractService: ContractService,
        private store$: Store<any>
    ) { }
}