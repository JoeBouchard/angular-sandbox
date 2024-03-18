import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

export interface Place {
  'place name': string;
  longitude: string;
  latitude: string;
  state: string;
  'state abbreviation': string;
}

export interface ZipData {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: Place[];
}

@Injectable({
  providedIn: 'root',
})
export class ZipFetcherService {
  private apiEndpoint = 'https://api.zippopotam.us/us/'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  selectedZip: Subject<ZipData> = new Subject<ZipData>();

  constructor(private http: HttpClient, private logger: LoggerService) {}

  selectZip(code: number): void {
    this.getZipData(code)
      .pipe(tap((_) => this.selectedZip.next(_)))
      .subscribe();
  }

  getZipData(code: number): Observable<ZipData> {
    this.logger.add(this.apiEndpoint + `${code}`);
    return this.http.get<ZipData>(this.apiEndpoint + `${code}`).pipe(
      tap((_) => {
        this.logger.add(JSON.stringify(_));
      }),
      catchError(this.handleError<ZipData>('Get Zip Date'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.logger.add(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
