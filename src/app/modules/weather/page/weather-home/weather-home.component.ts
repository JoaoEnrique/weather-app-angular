import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/models/interfaces/WeatherDatas.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  defaultCityName = "São Paulo";
  weatherDatas!: WeatherDatas;

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.getWeatherDatas(this.defaultCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getWeatherDatas(cityName: string): void{
    this.weatherService.getWeatherDatas(cityName)
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
      },
      error: (error) => console.log(error)
    })
  }
}
