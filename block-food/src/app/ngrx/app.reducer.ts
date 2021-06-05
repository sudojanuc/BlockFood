import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { Restaurant } from "../restaurant/restaurant.component";
import { setRestaurants } from "./app.actions";

export type RestaurantStateType = 
{restaurants : ReadonlyArray<Restaurant>, 
  // myRestaurant : Restaurant | undefined 
};

export const initialState: RestaurantStateType = 
{
 restaurants : []
//  myRestaurant: undefined
}
;

export const restaurantsReducer = createReducer(
  initialState,
  on(setRestaurants, (state, { restaurants }) => ({...state, restaurants: [...restaurants]})),

);

export const selectRestaurants = createSelector<any,any,any>(
  (state: AppState) => state.restaurants,
  (restaurants: {restaurants : ReadonlyArray<Restaurant> }) => restaurants.restaurants
);

// export const selectMyRestaurant = createSelector<any,any,any>(
//   (state: AppState) => state.restaurants,
//   (restaurants: RestaurantStateType) => restaurants.myRestaurant
// );