import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HijriDatePipe } from '../../../../../../core/pipes/date-hijri.pipe';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-table-a-recent-articles',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    HijriDatePipe,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './table-a-recent-articles.component.html',
  styleUrl: './table-a-recent-articles.component.scss',
})
export class TableARecentArticlesComponent {
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
}
