import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ForecastData {
  p1: number;
  p2: number;
  p3: number;
}

@Injectable({ providedIn: 'root' })
export class InputDataService {
  constructor(private http: HttpClient) {}

  getForecast(): Observable<ForecastData> {
    return this.http.get('assets/firstInputData.xml', { responseType: 'text' }).pipe(
      map((xml) => {
        console.log('GELADENES XML:', xml); // <--- Debug hier
        return this.parseXml(xml);
      })
    );
  }


  private parseXml(xmlStr: string): ForecastData {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlStr, 'application/xml');
    const forecast = xml.querySelector('forecast');
    console.log('GEFUNDENER FORECAST:', forecast?.getAttribute('p1'));
    const p1 = Number(forecast?.getAttribute('p1'));
    const p2 = Number(forecast?.getAttribute('p2'));
    const p3 = Number(forecast?.getAttribute('p3'));
    console.log('Forecast parsed as numbers:', { p1, p2, p3 });
    return { p1, p2, p3 };
  }
}
