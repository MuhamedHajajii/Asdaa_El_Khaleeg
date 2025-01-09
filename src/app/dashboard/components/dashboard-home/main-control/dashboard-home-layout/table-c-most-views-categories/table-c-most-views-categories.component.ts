import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

// Register the Data Labels Plugin
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-table-c-most-views-categories',
  standalone: true,
  imports: [TableModule, CardModule, ChartModule],
  templateUrl: './table-c-most-views-categories.component.html',
  styleUrl: './table-c-most-views-categories.component.scss',
})
export class TableCMostViewsCategoriesComponent {
  // Data for the Most Viewed Categories
  mostViewedCategories = [
    { name: 'أخبار محلية', views: 500 },
    { name: 'الرياضة', views: 450 },
    { name: 'الاقتصاد', views: 300 },
    { name: 'التعليم', views: 250 },
    { name: 'المقلات', views: 150 },
  ];

  // Chart data
  categoryChartData: any;
  categoryChartOptions: any;

  ngOnInit(): void {
    this.prepareChartData();
  }

  private prepareChartData() {
    // Extract labels and data for the chart
    const labels = this.mostViewedCategories.map((category) => category.name);
    const data = this.mostViewedCategories.map((category) => category.views);

    // Prepare the chart data structure
    this.categoryChartData = {
      labels: labels,
      datasets: [
        {
          label: 'عدد المشاهدات',
          data: data,
          backgroundColor: '#42A5F5', // Customize the bar color
          borderColor: '#1E88E5', // Customize the border color
          borderWidth: 1,
        },
      ],
    };

    // Chart options (customize as needed)
    this.categoryChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `مشاهدة: ${context.raw}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 50,
          },
        },
      },
    };
  }
}
