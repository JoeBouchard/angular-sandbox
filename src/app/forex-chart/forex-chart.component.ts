import { Component, Input, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import {
  ForexFetcherService,
  TimeRateResponse,
} from '../../services/forex-fetcher.service';

export interface TimeChartData {
  time: Date;
  value: number;
}

@Component({
  selector: 'app-forex-chart',
  standalone: true,
  imports: [AgChartsAngular],
  template: `<ag-charts-angular
    style="height:450px;"
    [options]="options"
  ></ag-charts-angular>`,
})
export class ForexChartComponent implements OnInit {
  public options: AgChartOptions = {};

  @Input()
  public currencyCode: string = '';

  private formatChartData(data: TimeRateResponse | undefined): TimeChartData[] {
    console.log(data);
    if (!data) return [];
    return Object.keys(data.rates).map((rate) => ({
      time: new Date(rate),
      value: data.rates[rate][this.currencyCode],
    }));
  }

  configureOptions(chartData: TimeRateResponse | undefined) {
    const data = this.formatChartData(chartData);

    this.options = {
      width: 390,
      height: 390,
      title: {
        text: `${chartData?.base} to ${
          this.forex.currencyCodes[this.currencyCode]
        }`,
      },
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['value'],
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['time'],
        },
      ],
      data: data,
      series: [
        {
          type: 'line',
          xKey: 'time',
          yKey: 'value',
          yName: this.forex.currencyCodes[this.currencyCode],
          marker: {
            enabled: false,
          },
          tooltip: {
            renderer: ({ datum, xKey, yKey, yName }) => {
              return {
                title: new Date(datum[xKey]).toLocaleDateString(),
                content: `1 ${chartData?.base} was ${datum[yKey]} ${this.currencyCode}`,
              };
            },
          },
        },
      ],
    };
  }

  constructor(public forex: ForexFetcherService) {}

  ngOnInit(): void {
    this.forex.conversionDateData.subscribe((_) => this.configureOptions(_));
  }
}
