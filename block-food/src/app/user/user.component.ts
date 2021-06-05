import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { fetchRestaurantsType, setRestaurants } from '../ngrx/app.actions';
import { selectRestaurants } from '../ngrx/app.reducer';
// import { selectRestaurants } from '../ngrx/restautant.reducer';
import { ReservationComponent } from '../reservation/reservation.component';
import { Restaurant } from '../restaurant/restaurant.component';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // restaurants: Restaurant[] = [];
  restaurants$ = this.store.pipe(select(selectRestaurants));


  constructor(private contractService: ContractService,
    public dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.contractService.getAllRestaurents()
                        .then(res => console.log(res[0]))
    this.store.dispatch({type: fetchRestaurantsType});
  }

  openReservation(restaurant: Restaurant) {
    console.log(restaurant);
    
    this.dialog.open(ReservationComponent, {
      width: '70%',
      data: { restaurant: restaurant }
    });
  }

}
