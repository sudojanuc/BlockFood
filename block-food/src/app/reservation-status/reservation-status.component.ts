import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant';
import { getReservationKey } from '../ngrx/app.actions';
import { selectAddress, selectMyReservations, selectReservations, selectReservationsLoading, selectReservationsOfRestaurant } from '../ngrx/app.reducer';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-reservation-status',
  templateUrl: './reservation-status.component.html',
  styleUrls: ['./reservation-status.component.scss']
})
export class ReservationStatusComponent implements OnInit {
  displayedColumns: string[] = ['restaurant', 'reservationid', 
  'time',
  'checkIn', 
];

  reservations$ = this.store.pipe(
    select(selectMyReservations)
  )

  reservationsLoading$ = this.store.pipe(
    select(selectReservationsLoading)
  )

  @Input() restaurant: (Restaurant| null) = null ;

  constructor(
    private store: Store,
    private contractService : ContractService, 
    private elRef:ElementRef) { }

  ngOnInit(): void {
    console.log(this.restaurant);
    
    if(this.restaurant){
      this.reservations$ = this.store.pipe(
        select(selectReservationsOfRestaurant(this.restaurant))
      );
    }
  }

 

  checkin(id:any){
    let code = this.elRef.nativeElement.querySelector('#id' + id).value;
    
    this.contractService.checkin(id, code);
  }

  getId(id:string){
    return Number(id);
  }

  getDate(number: BigInt){
    let unix = +number.toString()*1000;
    return new Date(unix);
  }

  async getReservationKey(resKey: string) {
    this.store.pipe(
          select(selectAddress),
          switchMap(address=> this.contractService.getReservationKey(resKey, address) ),
          tap(key =>alert(key.toString()))
          ).subscribe()
    // this.contractService.getReservationKey(resKey, '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B'
    // ).then(v =>
    //   {
    //   console.log(v)
    //   }
    //   )
      // let key = await this.contractService.getReservationKey(resKey, '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B')
      // console.log(key.toString());
      // return key.toString();
  //  return await this.contractService.getReservationKey(resKey, '0xEF571ac215b9eC5Ef22a12954fF0d87d90e1F10B');

  }

}
