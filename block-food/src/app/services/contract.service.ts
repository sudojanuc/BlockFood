import { Inject, Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../restaurant/restaurant.component';
import { WEB3PROVIDER } from './providers';
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public address: any;
  private contract: any;
  private provider: any;

  constructor(@Inject(WEB3PROVIDER) private web3Provider: any) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.createContract();
  }

  private createContract() {
    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    const daiAbi = environment.abi;
    const daiAddress = environment.address;

    // The Contract object
    this.contract = new ethers.Contract(daiAddress, daiAbi, this.provider);
    this.contract = this.contract.connect(this.provider.getSigner());
  }

  public createRestaurant(name:string){
    this.contract.functions.createProvider(name); 
  }

  public getRestaurant():Restaurant{
    return this.contract.functions.getCurrentProvider(); 
  }

}








// private dostuff(){
//   // let provider = new ethers.providers.BaseProvider(environment.network);
//   console.log(window.ethereum);
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   provider.ready.then(res => {
//     this.address = window.ethereum.selectedAddress;
//        // You can also use an ENS name for the contract address
// const daiAddress = "0x050604e1C0855D4881c02dF44940C181F9D66249";

// // The ERC-20 Contract ABI, which is a common contract interface
// // for tokens (this is the Human-Readable ABI format)
// const daiAbi = 
// [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createProvider","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"guestCount","type":"uint16"}],"name":"createReservationUnit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getThePrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}
// //  ,{"inputs":[],"name":"getProvicers","outputs":[{"internalType":"Provider[]","name":"","type":"Provider[]"}],"stateMutability":"view","type":"function"}
// ,{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownerOfProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"providerOfOwner","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"providers","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnitCountOfProvider","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnitOfProvider","outputs":[{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnits","outputs":[{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"}]
// ;

// // The Contract object
// this.contract = new ethers.Contract(daiAddress, daiAbi, provider);

// console.log(this.contract);
//   console.log(provider.getSigner());
  
//   this.contract = this.contract.connect(provider.getSigner());


//   this.contract.functions.createProvider('jan_was_here'); 
//   this.contract.functions.providers(0).then((res: any) => console.log(res));
//   });
// }