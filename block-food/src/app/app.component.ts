import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { setAddress, addReservation, addRestaurant, addTable, fetchAddressType, fetchReservationsType, fetchRestaurantsType, fetchTablesType, setRestaurantsLoading, setTablesLoading } from './ngrx/app.actions';
import { selectAddress } from './ngrx/app.reducer';
import { ContractService } from './services/contract.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private contractService: ContractService,
    private store: Store) {
  }

  myAddress$ = this.store.pipe(select(selectAddress));


  public mode: string = 'home';

  ngOnInit() {

    this.myAddress$.pipe(
      filter(address => address),
      take(1),
      tap((address) => {
        console.log('got address', address);
        
        this.store.dispatch({ type: fetchRestaurantsType });
        this.store.dispatch({ type: fetchTablesType });
        this.store.dispatch({ type: fetchReservationsType });
      })
    ).subscribe()


    this.contractService.contract.on('LogNewProvider', (_fromAddress: any, restaurant: any) => {
      console.log('new Restaurant', restaurant);
      this.store.dispatch(addRestaurant({ restaurant: restaurant }));
      this.myAddress$.pipe(
        take(1),
        filter((address) => address == _fromAddress ),
        map(() => this.store.dispatch(setRestaurantsLoading({ isLoading: false })))).subscribe();
    });

    this.contractService.contract.on('LogNewUnit', (_fromAddress: any, table: any) => {
      this.store.dispatch(addTable({ table: table }));
      this.myAddress$.pipe(
        take(1),
        filter((address) => address == _fromAddress ),
        map(() => this.store.dispatch(setTablesLoading({ isLoading: false })))).subscribe();
    })

    this.contractService.contract.on('LogNewReservation', (_fromAddress: any, reservation: any) => {
      this.store.dispatch(addReservation({ reservation: reservation }));
    });

  }
  title = 'block-food';


  public changeMode(mode: any) {
    this.mode = mode;
  }

  connect() {
    this.contractService.connectMetamask();
  }

}
