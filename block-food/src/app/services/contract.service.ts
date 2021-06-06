import { Inject, Injectable } from '@angular/core';
import { ethers, utils } from 'ethers';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { WEB3PROVIDER } from './providers';
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {  
  
  public address: any;
  public contract: any;
  public contract2: any;
  public provider: any;
  
  constructor(@Inject(WEB3PROVIDER) private web3Provider: any) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    
    let daiAbi = environment.abi;
    let daiAddress = environment.address;
    this.contract = this.createContract(daiAbi, daiAddress);
    
    // let daiAbi2 = environment.abi2;
    // let daiAddress2 = environment.address2;
    // this.contract2 = this.createContract(daiAbi2,daiAddress2);
        
  }
  
  private createContract(daiAbi:any, daiAddress:string):any {
    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    // const daiAbi = environment.abi;
    // const daiAddress = environment.address;
    
    // The Contract object
    let contract = new ethers.Contract(daiAddress, daiAbi, this.provider);
    contract = contract.connect(this.provider.getSigner());
    return contract;
    
    
    // this.contract.createReservation({value:ethers.utils.parseEther('0.2'),  gasLimit: 1000000});
  }
  
  
  public createRestaurant(name:string){
    this.contract.createProvider(name); 
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
  
  saveTable(restaurant: Restaurant, guestCount: number) {
    this.contract.functions.createUnit(restaurant.providerId,guestCount); 
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

