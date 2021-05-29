import { Component, Inject, OnInit } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { from, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WEB3PROVIDER } from './services/providers';

declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(@Inject(WEB3PROVIDER) private web3Provider : any){
    
  }
  private window: any;
  public address: any;

  async ngOnInit(): Promise<void> {
    console.log(this.web3Provider.selectedAddress);
    // let provider = new ethers.providers.BaseProvider(environment.network);
    console.log(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.ready.then(res => {
      this.address = window.ethereum.selectedAddress;
         // You can also use an ENS name for the contract address
const daiAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = 
 [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createProvider","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"guestCount","type":"uint16"}],"name":"createReservationUnit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getThePrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownerOfProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"providerOfOwner","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"providers","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnitCountOfProvider","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnitOfProvider","outputs":[{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reservationUnits","outputs":[{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"bool","name":"isCreated","type":"bool"}],"stateMutability":"view","type":"function"}]
;

// The Contract object
const contract = new ethers.Contract(daiAddress, daiAbi, provider);

console.log(contract);
    console.log(provider.getSigner());
    
    contract.connect(provider.getSigner());
    contract.functions.createProvider('test');   
    });

    let balance = await provider.getBalance("eth");
    console.log(ethers.utils.formatEther(balance))
  }
  title = 'block-food';


}
