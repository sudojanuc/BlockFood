import { Component, OnInit } from '@angular/core';
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
  code = '';

  constructor(private contractService : ContractService) { }

  ngOnInit(): void {
    this.contractService.getMyReservations().then(res =>{
      this.dataSource = res;
      console.log(this.dataSource[0]);
      
    });
  }

  checkin(id:any){
    this.contractService.checkin(id, this.code);
  }

}
