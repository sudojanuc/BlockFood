import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

export interface Restaurant{
  id:number
  name:string
  isCreated: boolean
}

export interface Table{
  id: string,
  possibleGuestCount: number,
  isCreated : boolean
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  constructor(private contractService: ContractService) { }
  name:string = '';
  restaurant: Restaurant | undefined| any;
  chairs:number = 0;
  $tables: Promise<Table[]> | undefined;
  tables: Table[] = [];
  isLoading:boolean = true;


  ngOnInit(): void {
    this.getRestaurant();
  }

  public saveRestaurant(){
    this.contractService.createRestaurant(this.name);
  }

  public saveTable(){
    this.contractService.saveTable(this.chairs);
  }

  public async getRestaurant(){
    this.contractService.getRestaurant()
                        .then(restaurants => this.restaurant = restaurants[0].isCreated ? restaurants[0] : undefined )
                        .catch(err => this.restaurant = undefined)
                        .finally(() =>{
                          this.getTables();
                          this.isLoading = false; 
                        }
                        );
    
  }

  public async getTables(){
  //  this.$tables =  this.contractService.getMyTables(this.restaurant);
  //                       // .then(tables => console.log(tables));

  this.contractService.getMyTables(this.restaurant)
                      .then(tables => this.tables = tables[0]);

  }

}
