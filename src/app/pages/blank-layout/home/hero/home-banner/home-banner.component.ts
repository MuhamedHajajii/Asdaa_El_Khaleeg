import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ICurrentTemp } from '../../../../../core/interfaces/banner/ICurrentTemp';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { SafeHtmlPipe } from '../../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [DatePipe, SafeHtmlPipe],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
})
export class HomeBannerComponent {
  currentTemp: string = '';
  sar: string = '';
  staticDate = '';
  year = new Date().getFullYear();
  currentPopulation: string = '37.33';
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private PLATFORM_ID: object
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=25&longitude=45&hourly=temperature_2m&timeformat=unixtime&forecast_days=1';

      const currency =
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

      const population = 'https://restcountries.com/v3.1/name/Saudi%20Arabia';

      this._HttpClient.get<any>(url).subscribe({
        next: (data: any) => {
          const temperatureCelsius = data.hourly.temperature_2m[0];
          const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
          // Log both Celsius and Fahrenheit
          this.currentTemp = `${Math.trunc(
            temperatureCelsius
          )}<sup>o</sup>C / ${Math.trunc(temperatureFahrenheit)}<sup>o</sup>F`;
        },
      });
      this._HttpClient.get<any>(currency).subscribe({
        next: (data: any) => {
          this.sar = data.usd.sar;
        },
      });
      setInterval(() => {
        let time = new Date();
        const saudiTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Riyadh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(time);

        this.staticDate = saudiTime;
      }, 1000);
    }
  }
}
