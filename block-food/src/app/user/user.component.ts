import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from '../reservation/reservation.component';
import { Restaurant } from '../restaurant/restaurant.component';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private contractService: ContractService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.contractService.getAllRestaurents()
                        .then(restaurants => this.restaurants = restaurants[0] )
                        .catch(() => this.restaurants = []);
  }

  openReservation(restaurant : Restaurant) {
    this.dialog.open(ReservationComponent, {
      width: '70%',
      data: { restaurant: restaurant }
    });
  }

}
