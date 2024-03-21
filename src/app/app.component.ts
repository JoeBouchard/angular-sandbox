import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { ZipCodePageComponent } from './zip-code-page/zip-code-page.component';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogsComponent,
    HttpClientModule,
    ZipCodePageComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'sandbox';
  currentYear = new Date().getFullYear();

  constructor(protected logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.add(
      `Page loaded at ${new Date().toLocaleTimeString()}. Starting log stream...`
    );
  }
}
