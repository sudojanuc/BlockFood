import { Component, Inject, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { WEB3PROVIDER } from './services/providers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(@Inject(WEB3PROVIDER) private web3Provider : any){

}

  ngOnInit(): void {
    console.log(this.web3Provider.selectedAddress)
  }
  title = 'block-food';


}
