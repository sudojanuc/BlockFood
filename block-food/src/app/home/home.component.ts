import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() changeModeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  setMode(mode:string){
    console.log(mode);
    
    this.changeModeEvent.emit(mode);
  }

}
