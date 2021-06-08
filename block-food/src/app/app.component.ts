import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { addReservation, addRestaurant, addTable, fetchAddressType, fetchReservationsType, fetchRestaurantsType, fetchTablesType, setTablesLoading } from './ngrx/app.actions';
import { selectAddress } from './ngrx/app.reducer';
import { ContractService } from './services/contract.service';
// import { Contract, ethers, Wallet } from 'ethers';
// import { from, of } from 'rxjs';
// import { tap, map, catchError } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { WEB3PROVIDER } from './services/providers';



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

    this.store.dispatch({ type: fetchAddressType });
    this.store.dispatch({ type: fetchRestaurantsType });
    this.store.dispatch({ type: fetchTablesType });
    this.store.dispatch({ type: fetchReservationsType });

    this.contractService.contract.on('LogNewProvider', (_fromAddress: any, restaurant: any) => {
      console.log('new Restaurant', restaurant);
      this.store.dispatch(addRestaurant({ restaurant: restaurant }));
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

}
