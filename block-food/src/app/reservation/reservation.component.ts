import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restaurant, Table } from '../restaurant/restaurant.component';
import { ContractService } from '../services/contract.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public restaurant: Restaurant;
  tables: Table[] = [];
  selected: Table | undefined;

  constructor(
    public dialogRef: MatDialogRef<ReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contractService: ContractService
  ) {
    this.restaurant = data.restaurant;
   }

  ngOnInit(): void {
    this.contractService.getMyTables(this.restaurant)
                        .then(tables => this.tables = tables[0] );

  }

  getColor(table: Table): string{
    if(this.selected == table) {
      return 'forestgreen';
    } else{
      return 'darkgreen';
    }
  }

}
