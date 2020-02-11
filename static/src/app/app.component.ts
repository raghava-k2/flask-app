import { Component, ViewChild, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service'
import { XMLUtil } from 'src/util/XMLUtil';
import { environment } from '../environments/environment';
declare const L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faSearch = faSearch;
  isSideNavOpened = false;
  showWeatherDetails = false;
  weatherDetails: any;
  countryDetails: any;
  alert: any = { show: false };
  map:any;

  constructor(private weatherService: WeatherService) {
    console.log('locationQ:', L);
  }

  ngOnInit() {
    const streets = L.tileLayer.Unwired({ key: environment.MAP_KEY, scheme: "streets" });
    this.map = L.map('map', {
      center: [39.73, -104.99], 
      zoom: 14,
      layers: [streets] 
    });
    L.control.scale().addTo(this.map);
    L.control.layers({
      "Streets": streets
    }).addTo(this.map);
    L.popup()
    .setLatLng([39.73, -104.99])
    .setContent("<b>Hello world!</b><br>I am a popup.")
    .openOn(this.map);
  }

  public searchWeather(name: string) {
    this.weatherService.getWeatherForecastDetails(name).subscribe((response: any) => {
      this.weatherDetails = response;
      this.showWeatherDetails = true;
      this.alert.show = false;
    }, (_: any) => {
      this.showWeatherDetails = false;
      this.alert = { show: true, message: 'Please provide valid Name', type: 'danger' };
    });
    this.getCountryDetails(name);
  }

  public getCountryDetails(countryName: string) {
    this.weatherService.getCountryDetails(countryName).subscribe((response: any) => {
      const xml = XMLUtil.stringToXML(response);
      this.countryDetails = XMLUtil.xmlToJson(xml);
    }, (error: any) => {
      console.error('error : ', error);
    })
  }

  public getCountryDetailsByName(key: string) {
    const country: any = this.countryDetails ? this.countryDetails['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getCountryResponse']['ns2:country'] : null;
    if (country) {
      return country[`ns2:${key}`]['#text'];
    }
    return 'NA';
  }
}
