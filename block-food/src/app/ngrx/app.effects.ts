import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, tap, filter, withLatestFrom } from 'rxjs/operators';
import { Reservation } from '../models/reservations';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { ContractService } from '../services/contract.service';
import { fetchAddressType, fetchReservationsType, fetchRestaurantsType, fetchTablesType, setAddress, setReservations, setRestaurants, setTables } from './app.actions';
import { AppState } from './app.reducer';

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
                // map(),
                withLatestFrom(this.store$),
                map(([reservations, store]) => 
                    setReservations({
                        reservations: reservations
                                        .map((reservation: Reservation) => {
                                            let table : Table = store.data.tables.find((table:Table) =>
                                            table.unitId == reservation.unitKey
                                            );
                                            let restaurant = store.data.restaurants.find((restaurant: Restaurant) => 
                                                restaurant.providerId == table.providerKey
                                            );
                                            // console.log('new Res',{...reservation, restaurant: restaurant});
                                                                                        
                                        return {...reservation, 
                                                restaurant: restaurant,
                                                table: table};
                                         } )
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