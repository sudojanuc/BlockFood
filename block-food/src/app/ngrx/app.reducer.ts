import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Restaurant } from "../restaurant/restaurant.component";
import { setAddress, setRestaurants } from "./app.actions";

export interface AppState  
{
  restaurants : ReadonlyArray<Restaurant>, 
  address: string
};

export const initialState: AppState = 
{
 restaurants : [],
 address: 'initial'
//  myRestaurant: undefined
}
;

export const appReducer = createReducer(
  initialState,
  on(setRestaurants, (state, { restaurants }) => ({...state, restaurants: [...restaurants]})),
  on(setAddress, (state, {address}) => ({...state, address: address}))
);



export const selectRestaurants = createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) =>  state.restaurants 
);

export const selectAddress = createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) =>  state.address 
);

export const selectMyRestaurant = createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) =>  state.restaurants.filter(restaurant => {console.log(restaurant)}) 
);

// export const selectMyRestaurant = createSelector<any,any,any>(
//   (state: AppState) => state.restaurants,
//   (restaurants: RestaurantStateType) => restaurants.myRestaurant
// );