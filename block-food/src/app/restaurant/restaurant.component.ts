import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectMyRestaurant, selectRestaurants } from '../ngrx/restaurant.reducer';
import { ContractService } from '../services/contract.service';

export interface Restaurant {
  id: number
  name: string
  isCreated: boolean
}

export interface Table {
  id: string,
  possibleGuestCount: number,
  isCreated: boolean,
  reservationCount: number
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  name: string = '';
  restaurant: Restaurant | undefined | any;
  chairs: number = 0;
  tables: Table[] = [];
  isLoading: boolean = true;
  myRestaurant$ = this.store.pipe(select(selectMyRestaurant));


  constructor(private contractService: ContractService,
    private store: Store) { }

  ngOnInit(): void {
    this.getRestaurant();

    this.contractService.contract.on('NewReservationUnit', (fromAddress: any, tables: any) => {
      if (fromAddress == this.contractService.address) {
        console.log(this.tables);
        if (this.tables.length == 0) {
          this.tables = [tables];
        } else {
          this.tables = [...this.tables,
            tables
          ];
        }
      }
    });

    this.contractService.contract.on('NewProvider', (fromAddress: any, restaurant: any) => {

      if (fromAddress == this.contractService.address) {
        this.restaurant = restaurant;
      }
    });

  }


  public saveRestaurant() {
    this.contractService.createRestaurant(this.name);
  }

  public saveTable() {
    this.contractService.saveTable(this.chairs);
  }

  public async getRestaurant() {
    this.contractService.getRestaurant()
      .then(restaurants => this.restaurant = restaurants[0].isCreated ? restaurants[0] : undefined)
      .catch(_err => this.restaurant = undefined)
      .finally(() => {
        if (this.restaurant) this.getTables();
        this.isLoading = false;
      }
      );

  }

  public async getTables() {
    //  this.$tables =  this.contractService.getMyTables(this.restaurant);
    //                       // .then(tables => console.log(tables));

    this.contractService.getMyTables(this.restaurant)
      .then(tables => this.tables = tables[0]);

  }

}

