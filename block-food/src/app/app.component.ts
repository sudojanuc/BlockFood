import { Component, Inject, OnInit } from '@angular/core';
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
  
  constructor(){
    
  }
  
  public mode:string = 'home';

  async ngOnInit(){
    
    
  }
  title = 'block-food';


public changeMode(mode:any){
  console.log('mode',mode);
  this.mode = mode;
}

}
