import { Component, ViewChild, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service'
import { XMLUtil } from 'src/util/XMLUtil';
import { environment } from '../environments/environment';
import { debounceTime } from 'rxjs/operators';
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
  locations: Array<any>;
  locationSearchValue: string;
  comment: string;
  comments: Array<string>;
  alert: any = { show: false };
  map: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.initializeMap();
    this.fetchComments();
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

  public locationSearch(event: any) {
    const { target } = event;
    const { value } = target;
    if (value.length > 2) {
      this.weatherService.getLocationDetails(value).pipe(debounceTime(3000)).subscribe((response: any) => {
        this.locations = response;
      }, (error: any) => {
        console.error('failed toserach lcoation : ', error);
      })
    }
  }

  initializeMap() {
    const streets = L.tileLayer.Unwired({ key: environment.MAP_KEY, scheme: "streets" });
    this.map = L.map('map', {
      center: [39.73, -104.99],
      zoom: 14,
      layers: [streets]
    });
    L.control.geocoder(environment.MAP_KEY).addTo(this.map);
    L.control.scale().addTo(this.map);
    L.control.layers({
      "Streets": streets
    }).addTo(this.map);
  }

  showSelectedLocation(location: any) {
    this.locationSearchValue = location.display_place;
    const marker = L.marker([location.lat, location.lon]).addTo(this.map);
    marker.bindPopup(`<b>${location.display_place}</b>`).openPopup();
    this.map.setView([location.lat, location.lon]);
    this.locations.length = 0;
  }

  fetchComments() {
    this.weatherService.getComment().subscribe((response: any) => {
      this.comments = response.map((e:string)=>(JSON.parse(e)));
    }, (error: any) => {
      console.error('failed to get comment : ', error);
    });
  }

  saveComment() {
    this.weatherService.updateComment(this.comment).subscribe(() => { 
      this.fetchComments();
    }, (error: any) => {
      console.error('failed to update comment : ', error);
    })
  }
}
