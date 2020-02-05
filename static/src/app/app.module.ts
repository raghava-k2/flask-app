import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar'
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbAlertModule,
    FormsModule,
    SidebarModule.forRoot()
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
