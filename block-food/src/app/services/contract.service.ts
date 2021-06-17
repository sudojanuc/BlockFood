import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { setAddress } from '../ngrx/app.actions';
import { WEB3PROVIDER } from './providers';
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {  
  
  public address: any;
  public contract: any;
  public provider: any;
  private daiAbi = environment.abi;
  private daiAddress = environment.address;
  
  constructor(
    @Inject(WEB3PROVIDER) public web3provider: any,
    private store: Store    
    ) {   
      if (typeof window.ethereum !== 'undefined') {   
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.contract = new ethers.Contract(this.daiAddress, this.daiAbi, this.provider);
      this.contract = this.contract.connect(this.provider.getSigner());

      this.web3provider.enable()
      .then((address: string) => 
          this.store.dispatch(setAddress({address: address[0]}))
          );
  } else {
    alert('please install metamask provider and then reload this page')
  }
  }

  public connectMetamask(){
    
    this.web3provider.enable()
                     .then((address: string) => 
                         this.store.dispatch(setAddress({address: address[0]}))
                         );

  }
  
  
  public createRestaurant(name:string, time: number): Observable<boolean>{
    return this.contract.createProvider(name, time); 
  }
  
  public getRestaurant():Promise<Restaurant[]>{
    return this.contract.functions.getCurrentProvider(); 
    
  }
  getAllRestaurents(): Promise<Restaurant[]> {
    return this.contract.getAllProviders();
  }
  
  public getAllTables():Promise<Table[]>  {
    return this.contract.getAllUnits(); 
    
  }
  
  saveTable(restaurant: Restaurant, guestCount: number): Observable<boolean> {
    return this.contract.functions.createUnit(restaurant.providerKey,guestCount); 
  }

  getKeyPrice(provider: Restaurant){
    return this.contract.getKeyPrice(provider.providerKey);
  }
  
  async createReservation (selected: Table | undefined, time: number) {
    let price = await this.contract.getKeyPrice(selected?.providerKey);
    console.log(price.toString(), selected, utils.parseEther('0.01'), price);
    
    // price = price.toString();
    
    return this.contract.createReservation(
      // price,
      selected?.unitKey,
      time,
      { value:price }
      // { value: utils.parseEther('0.01') }
      );
  }

  getAllReservations(): Promise<any> {
    return this.contract.getAllReservations();
  }
  
  checkin(id:any,code:any) {
    this.contract.refundReservation(id,code,  {gasLimit : 300000} );
  }

}

