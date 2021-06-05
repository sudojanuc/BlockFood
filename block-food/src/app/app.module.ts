import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WEB3PROVIDER } from './services/providers';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { UserComponent } from './user/user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReservationComponent } from './reservation/reservation.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationStatusComponent } from './reservation-status/reservation-status.component';
import {MatTableModule} from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { restaurantsReducer } from './ngrx/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './ngrx/app.effects';




export function enableWeb3Provider(provider : any) {
  return () => {
    provider.enable();  // Ask the user to enable MetaMask at load time.
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RestaurantComponent,
    UserComponent,
    ReservationComponent,
    ReservationStatusComponent
  ],
  imports: [
    StoreModule.forRoot({ restaurants: restaurantsReducer }),
    EffectsModule.forRoot([AppEffects]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule ,
    FormsModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: enableWeb3Provider,
      deps: [WEB3PROVIDER],
      multi: true
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
