import { Component, Input, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions, AgCharts, AgChartTheme } from 'ag-charts-community';
import {
  ForexFetcherService,
  TimeRateResponse,
} from '../../services/forex-fetcher.service';

export interface TimeChartData {
  time: Date;
  value: number;
}

const greenChart: AgChartTheme = {
  baseTheme: 'ag-default',
  palette: {
    fills: ['#88dda8', '#88dd88', '#88dd88', '#88dd88', '#88dd88', '#88dd88'],
  },
};

const redChart: AgChartTheme = {
  baseTheme: 'ag-default',
  palette: {
    fills: ['#dd8888', '#dd8888', '#dd8888', '#dd8888', '#dd8888', '#dd8888'],
  },
};

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
    return Object.keys(data.rates)
      .map((rate) => ({
        time: new Date(rate),
        value: data.rates[rate][this.currencyCode],
      }))
      .filter((val) => val.value !== undefined);
  }

  configureOptions(chartData: TimeRateResponse | undefined) {
    const data = this.formatChartData(chartData);
    data.sort((a, b) => (a.time < b.time ? -1 : 1));
    var bgColor = '#eecccc';
    var theme = redChart;
    const firstValue = data[0].value;
    console.log(data[0]);

    if (firstValue < data[data.length - 1].value) {
      bgColor = '#cceecc';
      theme = greenChart;
    }

    this.options = {
      theme,
      width: 390,
      height: 390,
      animation: {
        enabled: true,
        duration: 0.25,
      },
      // background: { fill: bgColor },
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
            renderer: ({ datum, xKey, yKey }) => {
              return {
                title: new Date(datum[xKey]).toLocaleDateString(),
                content: `1 ${chartData?.base} was ${datum[yKey]} ${this.currencyCode}`,
                backgroundColor:
                  datum[yKey] > firstValue ? '#55bb75' : '#bb6555',
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
