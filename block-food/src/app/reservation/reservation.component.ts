import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { selectTablesOfRestaurant } from '../ngrx/app.reducer';
import { ContractService } from '../services/contract.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public restaurant: Restaurant;
  selected: Table | undefined;
  myTables$: Observable<Table[]>;

  constructor(
    public dialogRef: MatDialogRef<ReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contractService: ContractService,
    private store: Store
  ) {
    this.restaurant = data.restaurant;
    this.myTables$ = this.store.pipe(
      select(selectTablesOfRestaurant(this.restaurant))
    );
  }

  ngOnInit(): void {
    // this.contractService.contract2.on('CreateReservation', (fromAddress: any, table: any) => {
    //   console.log('CreateReservation');
    //   console.log(table);

    //   if (fromAddress == this.contractService.address) {
    //     this.loadTables();
    //   }
    // });

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
