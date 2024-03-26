import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import {
  ForexFetcherService,
  TimeRateResponse,
} from '../../services/forex-fetcher.service';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForexChartComponent } from '../forex-chart/forex-chart.component';

@Component({
  selector: 'app-forex-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgForOf, ForexChartComponent],
  templateUrl: './forex-page.component.html',
  styleUrl: './forex-page.component.css',
})
export class ForexPageComponent implements OnInit {
  protected selectedCurrencyCode: string = 'USD';
  protected selectedStartDate: string = '2020-01-01';
  protected selectedEndDate: string = new Date().toISOString().split('T')[0];

  protected conversionDateData: TimeRateResponse = {
    amount: 0,
    base: '',
    start_date: '',
    end_date: '',
    rates: {},
  };

  get conversionDates(): string[] {
    return Object.keys(this.conversionDateData.rates);
  }

  constructor(
    protected forex: ForexFetcherService,
    protected logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.forex.conversionDateData.subscribe(
      (_) => (this.conversionDateData = _)
    );
    this.updateCharts();
  }

  updateCharts() {
    this.logger.add(
      `Requesting ${this.selectedCurrencyCode} data from ${this.selectedStartDate} to ${this.selectedEndDate}`
    );
    this.forex.updateConversionDateData({
      code: this.selectedCurrencyCode,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
    });
  }
}
