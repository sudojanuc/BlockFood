import { Component, ElementRef, OnInit } from '@angular/core';
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
  dataSource = [
  ];

  constructor(private contractService : ContractService, 
    private elRef:ElementRef) { }

  ngOnInit(): void {
    this.getReservations();
    this.contractService.contract2.on('RefundReservation', (fromAddress: any, reservation: any) =>{
      console.log('refund');
      console.log(reservation);
      
      
      if(fromAddress == this.contractService.address){
        this.getReservations();
      }
    });
  }

  getReservations(){
    this.contractService.getMyReservations().then(res =>{
      this.dataSource = res.filter((v:any) => v.isCreated );
      this.dataSource.forEach((res:any) => {
        console.log('id: ', res.id.toString());
        console.log('key: ', res.checkInKey.toString());

      }
        )
    });
  }

  checkin(id:any){
    let code = this.elRef.nativeElement.querySelector('#id' + id).value;
    
    this.contractService.checkin(id, code);
  }

}
