import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';
import { Observable, Subject, tap } from 'rxjs';

export interface TimeRate {
  [code: string]: number;
}

export interface ConversionDateData {
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
  private _percentMode = false;
  private _conversionDateData: ConversionDateData = {
    code: 'USD',
    startDate: '2020-01-01',
    endDate: new Date().toISOString().split('T')[0],
  };

  get percentMode(): boolean {
    return this._percentMode;
  }
  set percentMode(val: string) {
    this._percentMode = val === 'true';
    this.updateConversionDateData(this._conversionDateData);
  }

  private _currencyCodes: CodesNames = {};

  get currencyCodes(): CodesNames {
    if (this._percentMode) return { AVG: 'Average', ...this._currencyCodes };
    else return this._currencyCodes;
  }
  conversionDateData = new Subject<TimeRateResponse>();

  get currencyShortCodeList(): string[] {
    return Object.keys(this.currencyCodes);
  }

  private getCurrencyCodes() {
    this.http.get(`${this.apiEndpoint}/currencies`).subscribe((_) => {
      this._currencyCodes = _ as CodesNames;
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
  }: ConversionDateData): void {
    this._conversionDateData = { code, startDate, endDate };

    if (this.percentMode)
      this.updateConversionDateDataPercent({ code, startDate, endDate });
    else this.updateConversionDateDataRaw({ code, startDate, endDate });
  }

  private updateConversionDateDataRaw({
    code,
    startDate,
    endDate,
  }: ConversionDateData): void {
    this.http
      .get(`${this.apiEndpoint}/${startDate}..${endDate}?base=${code}`)
      .subscribe((_) => this.conversionDateData.next(_ as TimeRateResponse));
  }

  private updateConversionDateDataPercent({
    code,
    startDate,
    endDate,
  }: ConversionDateData): void {
    this.http
      .get(`${this.apiEndpoint}/${startDate}..${endDate}?base=${code}`)
      .subscribe((_) => {
        const timeData = _ as TimeRateResponse;
        let percentData = timeData;

        const firstCodes: TimeRate = {};

        this.currencyShortCodeList.forEach((code) => {
          const firstNonNull =
            Object.keys(timeData.rates)
              .sort()
              .find((key) => timeData.rates[key][code]) ?? timeData.end_date;
          firstCodes[code] = timeData.rates[firstNonNull][code];
        });

        Object.keys(timeData.rates).forEach((key) => {
          const percentRate = timeData.rates[key];
          Object.keys(timeData.rates[key]).forEach((currCode) => {
            percentRate[currCode] =
              Math.round(
                (timeData.rates[key][currCode] / firstCodes[currCode]) * 10000
              ) / 100;
          });
          const sumOfPercents = Object.values(percentRate).reduce(
            (val: number, currentValue: number) => {
              if (!isNaN(val + currentValue) && currentValue <= 200)
                return val + currentValue;
              return val;
            },
            0
          );
          percentRate['AVG'] =
            Math.floor(
              (sumOfPercents /
                Object.values(percentRate).filter(
                  (pr) => !isNaN(pr) && pr < 200
                ).length) *
                100
            ) / 100;
          percentData.rates[key] = percentRate;
        });

        this.conversionDateData.next(percentData);
      });
  }
}
