import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-table-a-most-views-blog-chart',
  standalone: true,
  imports: [ChartModule, CardModule],
  templateUrl: './table-a-most-views-blog-chart.component.html',
  styleUrl: './table-a-most-views-blog-chart.component.scss',
})
export class TableAMostViewsBlogChartComponent {
  mostViewedArticles = [
    {
      title:
        'الشؤون الإسلامية في جازان وبالتعاون مع جمعية الدعوة والإرشاد وتوعية الجاليات تختتم الدورة العلمية المتقدمة الثانية في صامطة',
      views: 500,
      publishedDate: new Date('2025-01-01'),
    },
    {
      title: 'تنفيذ حكم القتل تعزيرًا بأحد الجناة في المنطقة الشرقية',
      views: 450,
      publishedDate: new Date('2025-01-03'),
    },
    {
      title:
        'نائب أمير منطقة حائل يتفقّد أعمال مشروع استكمال طريق "حائل - رفحاء" الجديد',
      views: 300,
      publishedDate: new Date('2025-01-05'),
    },
    {
      title:
        'الشؤون الإسلامية في جازان وبالتعاون مع جمعية الدعوة والإرشاد وتوعية الجاليات تختتم الدورة العلمية المتقدمة الثانية في صامطة',
      views: 200,
      publishedDate: new Date('2025-01-01'),
    },
    {
      title: 'تنفيذ حكم القتل تعزيرًا بأحد الجناة في المنطقة الشرقية',
      views: 150,
      publishedDate: new Date('2025-01-03'),
    },
  ];

  // Get only the first letter of each title
  chartData = {
    labels: this.mostViewedArticles.map((article) =>
      article.title.split(' ').splice(0, 4).join(' ')
    ),
    datasets: [
      {
        data: this.mostViewedArticles.map((article) => article.views),
        backgroundColor: [
          '#FF6384f8',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
        ], // Optional colors
      },
    ],
  };

  // Tooltip configuration to show full title on hover
  chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const articleIndex = context.dataIndex;
            const articleTitle = this.mostViewedArticles[articleIndex].title;
            return articleTitle; // Show the full title in the tooltip
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };
}
