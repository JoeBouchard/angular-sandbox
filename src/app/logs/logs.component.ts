import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
})
export class LogsComponent {
  constructor(protected logger: LoggerService) {}

  pingLog(): void {
    this.logger.add(
      `You clicked the ping button at ${new Date().toLocaleTimeString()}`
    );
  }
}
