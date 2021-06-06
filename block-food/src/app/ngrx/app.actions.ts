import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';

export const setRestaurants = createAction(
    '[Restaurant] set restaurants',
    props<{ restaurants: Restaurant[] }>()
);

export const setAddress = createAction(
    '[Address] set address',
    props<{ address: string }>()
);

export const setTables = createAction(
    '[Tables] set tables',
    props<{ tables: Table[] }>()
);

export const setReservations = createAction(
    '[Reservations] set reservations',
    props<{ reservations: any[] }>()
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


