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
      console.log(window.ethereum);
      
      if (typeof window.ethereum !== 'undefined') {   
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.contract = new ethers.Contract(this.daiAddress, this.daiAbi, this.provider);
      this.contract = this.contract.connect(this.provider.getSigner());
      this.provider.on("network", (newNetwork: any, oldNetwork: any) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        console.log(newNetwork,oldNetwork);
        
        if (oldNetwork) {
            window.location.reload();
        }
    });
    console.log(this.web3provider, this.provider, this.contract,this.provider.getSigner());
  } else {
    alert('please install metamask provider and then reload this page')
  }
  }
  
  public createContract():any {

  }
  public connectMetamask(){
    
    this.web3provider.enable()
                     .then((address: string) => 
                         this.store.dispatch(setAddress({address: address[0]}))
                         );

  }
  
  
  public createRestaurant(name:string): Observable<boolean>{
    return this.contract.createProvider(name); 
  }
  
  public getRestaurant():Promise<Restaurant[]>{
    return this.contract.functions.getCurrentProvider(); 
    
  }
  getAllRestaurents(): Promise<Restaurant[]> {
    console.log(this.contract);
    
    return this.contract.getAllProviders();
  }
  
  public getAllTables():Promise<Table[]>  {
    return this.contract.getAllUnits(); 
    
  }
  
  saveTable(restaurant: Restaurant, guestCount: number): Observable<boolean> {
    return this.contract.functions.createUnit(restaurant.providerId,guestCount); 
  }
  
  async createReservation (selected: Table | undefined) {
    // let price = await this.contract.getKeyPrice();
    // price = price.toString();
    
    this.contract.createReservation(selected?.unitId,
      // {value:price}
      { value: utils.parseEther('0.01') }
      );
  }

  getAllReservations(): Promise<any> {
    return this.contract.getAllReservations();
  }
  
  checkin(id:any,code:any) {
    this.contract.refundReservation(id,code,  {gasLimit : 300000} );
  }

}

