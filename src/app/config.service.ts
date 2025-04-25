import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  load(): Promise<void> {
    return lastValueFrom(this.http.get('/assets/config.json'))
      .then(config => {
        this.config = config;
      })
      .catch(err => {
        console.error('Erro ao carregar config.json:', err);
        return Promise.reject(err);
      });
  }

  get apiKey(): string {
    return this.config?.weatherApiKey || '';
  }
}
