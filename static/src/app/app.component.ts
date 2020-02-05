import { Component, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faSearch = faSearch;
  isSideNavOpened = false;
  showWeatherDetails = false;
  weatherDetails: any;
  alert: any = { show: false };

  @ViewChild('places', { static: true }) places: GooglePlaceDirective;

  constructor(private weatherService: WeatherService) { }

  public searchWeather(name: string) {
    this.weatherService.getWeatherForecastDetails(name).subscribe((response: any) => {
      this.weatherDetails = response;
      this.showWeatherDetails = true;
      this.alert.show = false;
    }, (_: any) => {
      this.showWeatherDetails = false;
      this.alert = { show: true, message: 'Please provide valid Name', type: 'danger' };
    });
  }

  public close(event: any) {
    console.log(event);
  }

  public onChange(address: any) {
    if (address.photos && address.photos.length > 0) {
      console.dir(address.photos[0].getUrl({ maxHeight: 500, maxWidth: 500 }));
    }
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
  }
}
