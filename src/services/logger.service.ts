import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Log {
  date: Date;
  entry: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: Log[] = [];
  observableLog: Observable<Log[]> = of(this.logs);

  add(entry: string) {
    this.logs.push({ date: new Date(), entry });
    console.log(entry);
  }

  clear() {
    this.logs = [];
  }
}
