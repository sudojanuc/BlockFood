import { createAction, props } from '@ngrx/store';
import { Reservation } from '../models/reservations';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { AppState } from './app.reducer';

export const setRestaurants = createAction(
    '[Restaurant] set restaurants',
    props<{ restaurants: Restaurant[] }>()
);

export const addRestaurant = createAction(
    '[Restaurant] add restaurant',
    props<{ restaurant: Restaurant }>()
);

export const setAddress = createAction(
    '[Address] set address',
    props<{ address: string }>()
);

export const setTables = createAction(
    '[Tables] set tables',
    props<{ tables: Table[] }>()
);

export const addTable = createAction(
    '[Tables] add table',
    props<{ table: Table }>()
);

export const setReservations = createAction(
    '[Reservations] set reservations',
    props<{ reservations: Reservation[] }>()
);

export const addReservation = createAction(
    '[Reservations] add reservation',
    props< {reservation: Reservation} >()
);

// export const setMyRestaurant = createAction(
//     '[Restaurant] set my restaurant',
//     props<{ restaurant: Restaurant }>()
//     );

export const fetchRestaurantsType = '[Restaurant] fetch';
// export const createRestaurantType = '[Restaurant] create';

export const fetchAddressType = '[Address] fetch';

export const fetchTablesType = '[Tables] fetch';

export const fetchReservationsType = '[Reservations] fetch';


