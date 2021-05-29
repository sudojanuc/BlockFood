import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

export interface Restaurant{
  name:string
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  constructor(private contractService: ContractService) { }
  name:string = '';
  restaurant: Restaurant | undefined;
  
  ngOnInit(): void {
    this.getRestaurant();
  }

  public saveRestaurant(){
    this.contractService.createRestaurant(this.name);
  }

  public async getRestaurant(){
    this.restaurant = await this.contractService.getRestaurant();
    console.log(this.restaurant);
    
  }

}
