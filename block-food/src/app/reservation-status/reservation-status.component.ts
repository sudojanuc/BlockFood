import { Component, ElementRef, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectMyReservations, selectReservations, selectReservationsLoading } from '../ngrx/app.reducer';
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

  constructor(
    private store: Store,
    private contractService : ContractService, 
    private elRef:ElementRef) { }

  ngOnInit(): void {
    this.getReservations();
    // this.contractService.contract2.on('RefundReservation', (fromAddress: any, reservation: any) =>{
    //   console.log('refund');
    //   console.log(reservation);
      
      
    //   if(fromAddress == this.contractService.address){
    //     this.getReservations();
    //   }
    // });
  }

  getReservations(){
    // this.contractService.getMyReservations().then(res =>{
    //   this.dataSource = res.filter((v:any) => v.isCreated );
    //   this.dataSource.forEach((res:any) => {
    //     console.log('id: ', res.id.toString());
    //     console.log('key: ', res.checkInKey.toString());

    //   }
    //     )
    // });
  }

  checkin(id:any){
    let code = this.elRef.nativeElement.querySelector('#id' + id).value;
    
    this.contractService.checkin(id, code);
  }

  getId(id:string){
    return Number(id);
    // return id;
  }

  getDate(number: BigInt){
    let unix = +number.toString()*1000;
    return new Date(unix);

  }

}
