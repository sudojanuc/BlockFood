import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../restaurant/restaurant.component';

export const setRestaurants = createAction(
    '[Restaurant] set restaurants',
    props<{ restaurants: Restaurant[] }>()
    );

    export const setMyRestaurant = createAction(
        '[Restaurant] set my restaurant',
        props<{ restaurant: Restaurant }>()
        );
    
    export const fetchRestaurantsType = '[Restaurant] fetch restaurants';
    export const fetchMyRestaurantType = '[Restaurant] fetch my restaurant';
