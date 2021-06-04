import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setMyRestaurant } from './ngrx/restaurant.actions';
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
  
  public mode:string = 'home';

  ngOnInit(){
  
    this.contractService.contract.on('NewProvider', (fromAddress: any, restaurant: any) => {
      if (fromAddress == this.contractService.address) {
        this.store.dispatch(setMyRestaurant(restaurant))
      }
    });
    
  }
  title = 'block-food';


public changeMode(mode:any){
  this.mode = mode;
}

}
