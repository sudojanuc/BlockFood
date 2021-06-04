import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../restaurant/restaurant.component';

export const setRestaurants = createAction(
    '[Restaurant] set restaurants',
    props<{ restaurants: Restaurant[] }>()
    );

    export const setMyRestaurant = createAction(
        '[Restaurant] set my restaurant',
        props<{ restaurants: Restaurant }>()
        );
    
    export const fetchRestaurantsType = '[Restaurant] fetch restaurants';