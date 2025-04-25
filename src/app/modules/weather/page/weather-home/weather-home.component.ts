import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/models/interfaces/WeatherDatas.interface';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  defaultCityName = this.config.defaultCityName;
  weatherDatas!: WeatherDatas;

  constructor(private weatherService: WeatherService, private config: ConfigService){}

  ngOnInit(): void {
    this.getWeatherDatas(this.defaultCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getWeatherDatas(cityName: string): void{
    this.weatherService.getWeatherDatas(cityName)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
      },
      error: (error) => console.log(error)
    })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.defaultCityName);
  }
}
