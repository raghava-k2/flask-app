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
}
