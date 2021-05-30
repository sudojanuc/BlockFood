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
    this.contractService.getMyReservations().then(res =>{
      this.dataSource = res.filter((v:any) => v.isCreated );
      console.log(this.dataSource[0]);
    });
  }

  checkin(id:any){
    let code = this.elRef.nativeElement.querySelector('#id' + id).value;
    
    this.contractService.checkin(id, code);
  }

}
