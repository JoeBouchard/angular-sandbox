import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';
import { Observable, Subject, tap } from 'rxjs';

export interface TimeRate {
  [code: string]: number;
}

export interface conversionDateData {
  code: string;
  startDate: string;
  endDate: string;
}

export interface TimeRateResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [time: string]: TimeRate;
  };
}

interface CodesNames {
  [code: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class ForexFetcherService {
  private apiEndpoint = 'https://api.frankfurter.app';

  currencyCodes: CodesNames = {};
  conversionDateData = new Subject<TimeRateResponse>();

  get currencyShortCodeList(): string[] {
    return Object.keys(this.currencyCodes);
  }

  private getCurrencyCodes() {
    this.http.get(`${this.apiEndpoint}/currencies`).subscribe((_) => {
      this.currencyCodes = _ as CodesNames;
      this.logger.add(`Found codes ${JSON.stringify(_)}.`);
    });
  }

  constructor(private http: HttpClient, private logger: LoggerService) {
    this.getCurrencyCodes();
  }

  public updateConversionDateData({
    code,
    startDate,
    endDate,
  }: conversionDateData): void {
    this.http
      .get(`${this.apiEndpoint}/${startDate}..${endDate}?base=${code}`)
      .subscribe((_) => this.conversionDateData.next(_ as TimeRateResponse));
  }
}
