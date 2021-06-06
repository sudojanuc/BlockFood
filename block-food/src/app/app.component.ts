import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fetchAddressType, fetchReservationsType, fetchRestaurantsType, fetchTablesType } from './ngrx/app.actions';
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
  
  constructor(private contractService : ContractService,
              private store : Store){ 
  }

  myAddress$ = this.store.pipe(select(selectAddress));

  
  public mode:string = 'home';

  ngOnInit(){

        this.store.dispatch({type: fetchAddressType});
        this.store.dispatch({type: fetchRestaurantsType});
        this.store.dispatch({type: fetchTablesType});
        this.store.dispatch({type: fetchReservationsType});

    this.contractService.getAllReservations().then( v => {
      console.log('reservationApp: ', v);
      
    }
    )
  
    // this.contractService.contract.on('LogNewProvider', (fromAddress: any, restaurant: any) => {
    //   console.log('new Provider',restaurant);
      
    //   if (fromAddress == this.contractService.address) {
    //     // this.store.dispatch(setMyRestaurant(restaurant))
    //   }
    // });
    
  }
  title = 'block-food';


public changeMode(mode:any){
  this.mode = mode;
}

}
