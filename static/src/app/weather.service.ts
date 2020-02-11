import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForecastDetails(cityName: string): Observable<any> {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=${environment.WEATHER_API_KEY}`, {
      params: {
        'q': cityName
      }
    });
  }

  getCountryDetails(countryName: string): Observable<any> {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                     xmlns:gs="http://spring.io/guides/gs-producing-web-service">
          <soapenv:Header/>
            <soapenv:Body>
              <gs:getCountryRequest>
                <gs:name>${countryName}</gs:name>
              </gs:getCountryRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;
    return this.http.request('POST', `/ws`, {
      body: xml,
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    })
  }

  getLocationDetails(locationSearch: string): Observable<any> {
    return this.http.get(`https://api.locationiq.com/v1/autocomplete.php?key=${environment.MAP_KEY}&q=${locationSearch}`);
  }

}
