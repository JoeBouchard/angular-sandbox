import { Component, OnInit } from '@angular/core';
import { ZipData, ZipFetcherService } from '../../services/zip-fetcher.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit {
  protected zipData?: ZipData;
  constructor(protected zipFetcher: ZipFetcherService) {}

  ngOnInit(): void {
    this.getZipData();
  }

  getZipData(): void {
    this.zipFetcher.selectedZip.subscribe(
      (zipData) => (this.zipData = zipData)
    );
  }
}
