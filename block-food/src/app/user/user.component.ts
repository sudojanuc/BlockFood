import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/restaurant.component';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.contractService.getAllRestaurents()
                        .then(restaurants => this.restaurants = restaurants[0] );
  }

}
