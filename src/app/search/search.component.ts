import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { LoggerService } from '../../services/logger.service';
import { ZipData, ZipFetcherService } from '../../services/zip-fetcher.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  template: `<form>
    <input [(ngModel)]="searchTerm" name="search" />
    <button (click)="search()">Go to</button>
  </form> `,
})
export class SearchComponent implements OnInit {
  private _searchTerm = '';

  @Input()
  get searchTerm() {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    var filteredTerm = val.replaceAll(/\D/g, '').substring(0, 5);
    this.logger.add(
      `Setting search term to ${filteredTerm} from ${this._searchTerm}`
    );
    this._searchTerm = filteredTerm;
  }

  constructor(
    private logger: LoggerService,
    private zipFetcher: ZipFetcherService
  ) {}

  private searchTerms = new Subject<string>();
  zipData$!: Observable<ZipData>;

  ngOnInit(): void {
    this.searchTerms.subscribe((_) => {
      this.zipFetcher.selectZip(parseInt(_));
      this.logger.add(_);
    });
  }

  search() {
    if (this._searchTerm.length === 5) this.searchTerms.next(this._searchTerm);
  }
}
