import { Component } from '@angular/core';

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [],
  templateUrl: './home-news.component.html',
  styleUrl: './home-news.component.scss',
})
export class HomeNewsComponent {
  cardsContent = [
    {
      img_url: '/assets/images/pages/home/news/1.png',
      category: 'اقتصاد',
      author: 'راشد بن صالح',
      date: '6 جمادى الاخرة',
      description: `اعلان مواعيد تشغيل مسارات قطار الرياض ابتداء
بتشغيل 3 مسارات الازرق و الاصفر و البنفسجى`,
    },
    {
      img_url: '/assets/images/pages/home/news/2.png',
      category: 'اخبار رياضية',
      author: 'راشد بن صالح',
      date: '6 جمادى الاخرة',
      description: `اعلان مواعيد تشغيل مسارات قطار الرياض ابتداء
بتشغيل 3 مسارات الازرق و الاصفر و البنفسجى`,
    },
    {
      img_url: '/assets/images/pages/home/news/3.png',
      category: 'اخبار المجتمع',
      author: 'مريم الجابر',
      date: '6 جمادى الاخرة',
      description: `اعلان مواعيد تشغيل مسارات قطار الرياض ابتداء
بتشغيل 3 مسارات الازرق و الاصفر و البنفسجى`,
    },
    {
      img_url: '/assets/images/pages/home/news/4.png',
      category: 'ثقافة و فن',
      author: 'راشد بن صالح',
      date: '6 جمادى الاخرة',
      description: `اعلان مواعيد تشغيل مسارات قطار الرياض ابتداء
بتشغيل 3 مسارات الازرق و الاصفر و البنفسجى`,
    },
  ];
}
