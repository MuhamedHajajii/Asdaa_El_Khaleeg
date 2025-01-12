import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-table-a-most-views-blog-chart',
  standalone: true,
  imports: [ChartModule, CardModule],
  templateUrl: './table-a-most-views-blog-chart.component.html',
  styleUrls: ['./table-a-most-views-blog-chart.component.scss'],
})
export class TableAMostViewsBlogChartComponent {
  // Blog data
  mostViewedArticles = [
    {
      title: 'الشؤون الإسلامية تختتم الدورة العلمية المتقدمة الثانية في صامطة',
      views: 500,
      publishedDate: new Date('2025-01-01'),
    },
    {
      title: 'تنفيذ حكم القتل تعزيرًا بأحد الجناة في المنطقة الشرقية',
      views: 450,
      publishedDate: new Date('2025-01-03'),
    },
    {
      title: 'نائب أمير منطقة حائل يتفقّد طريق "حائل - رفحاء" الجديد',
      views: 300,
      publishedDate: new Date('2025-01-05'),
    },
    {
      title: 'الشؤون الإسلامية تختتم الدورة العلمية في صامطة',
      views: 200,
      publishedDate: new Date('2025-01-01'),
    },
    {
      title: 'تنفيذ حكم القتل بأحد الجناة في المنطقة الشرقية',
      views: 150,
      publishedDate: new Date('2025-01-03'),
    },
  ];

  // Calculate total views
  totalViews = this.mostViewedArticles.reduce(
    (sum, article) => sum + article.views,
    0
  );

  // Chart data
  chartData = {
    labels: this.mostViewedArticles.map((article) =>
      article.title.split(' ').splice(0, 3).join(' ')
    ),
    datasets: [
      {
        data: this.mostViewedArticles.map((article) =>
          ((article.views / this.totalViews) * 100).toFixed(2)
        ),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
        ],
      },
    ],
  };

  // Chart options with DataLabels plugin for displaying percentages inside slices
  chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const articleIndex = context.dataIndex;
            const articleTitle = this.mostViewedArticles[articleIndex].title;
            const percentage = context.raw;
            return `${articleTitle}: ${percentage}%`;
          },
        },
      },
      legend: {
        position: 'top',
      },
      datalabels: {
        color: '#ffffff', // White color for the percentage text
        font: {
          size: 16, // Font size of the label
          weight: 'bold', // Bold text
        },
        formatter: (value: any) => `${value}%`, // Show percentage values
        anchor: 'bottom', // Place text at the center of each slice
        align: 'right', // Align text at the center of each slice
        offset: 0, // No offset, ensure the text is exactly centered
      },
    },
  };
}
