import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private apiKey = this.configService.apiKey;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getWeatherDatas(cityName: string): Observable<any> {
    console.log(this.apiKey);
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`, {})
  }
}
