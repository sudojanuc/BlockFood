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
    this.loadTables();
    this.contractService.contract2.on('CreateReservation', (fromAddress: any, table: any) => {
      console.log('CreateReservation');
      console.log(table);

      if (fromAddress == this.contractService.address) {
        this.loadTables();
      }
    });

  }

  loadTables(){
    this.contractService.getMyTables(this.restaurant)
      .then(tables => {
        this.tables = tables[0]
        console.log(tables);
      });
  }

  getColor(table: Table): string {
    // console.log(table);

    if (this.selected == table) {
      return 'forestgreen';
    } else {
      return 'darkgreen';
    }
  }

  createReservation() {
    console.log(this.selected);
    if (!this.selected) {
      alert('Please select a Table');
      return;
    }
    this.contractService.createReservation(this.selected);


  }

}
