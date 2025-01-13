import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-d-total-monthly-views',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './d-total-monthly-views.component.html',
  styleUrl: './d-total-monthly-views.component.scss',
})
export class DTotalMonthlyViewsComponent {
  @Input() lastWeekCounters: number = 0;
  @Input() lastTwoWeeksCounters: number = 0;
  percentageChange: number = 0;

  changeType: string = '';
  ngOnInit() {
    this.calculatePercentageChange();
  }

  calculatePercentageChange(): void {
    if (this.lastTwoWeeksCounters === 0) {
      this.percentageChange = 0; // To prevent division by zero
      this.changeType = ''; // or any default text you want to show in this case
    } else {
      const difference = this.lastWeekCounters - this.lastTwoWeeksCounters;
      this.percentageChange =
        Math.floor((difference / this.lastTwoWeeksCounters) * 100 * 100) / 100;

      // Conditional message for positive or negative change
      if (this.percentageChange > 0) {
        this.changeType = 'الزيادة'; // Positive change
      } else if (this.percentageChange < 0) {
        this.changeType = 'النقص'; // Negative change
      } else {
        this.changeType = 'لا تغيير'; // No change, if the percentage is zero
      }
    }
  }
}
