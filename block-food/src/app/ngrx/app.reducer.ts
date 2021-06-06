import { createSelector, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Restaurant } from "../models/restaurant";
import { Table } from "../models/table";
import { setAddress, setReservations, setRestaurants, setTables } from "./app.actions";

export interface AppState  
{
  restaurants : ReadonlyArray<Restaurant>, 
  address: string,
  tables: ReadonlyArray<Table>,
  reservations: any[]
};

export const initialState: AppState = 
{
 restaurants : [],
 address: 'initial',
 tables: [],
 reservations: []
}
;

export const appReducer = createReducer(
  initialState,
  on(setRestaurants, (state, { restaurants }) => ({...state, restaurants: [...restaurants]})),
  on(setAddress, (state, {address}) => ({...state, address: address})),
  on(setTables, (state, {tables}) => ({...state, tables: [...tables]})),
  on(setReservations, (state, {reservations}) => ({...state, reservations: [...reservations]})),

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
  (state: AppState) => { 
    return state.restaurants.filter(restaurant => restaurant.owner == state.address)[0]
  }
);

export const selectTables = createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) => { 
    return state.tables
  }
);

export const selectTablesOfRestaurant = (restaurant:Restaurant) => createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) => state.tables.filter((table) => table.providerKey == restaurant?.providerId )
);

export const selectReservations = createSelector<any,any,any>(
  (reducer: any) => reducer.data,
  (state: AppState) =>  state.reservations 
);
