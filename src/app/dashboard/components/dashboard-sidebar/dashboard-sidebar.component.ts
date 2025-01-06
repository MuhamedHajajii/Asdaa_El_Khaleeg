import { Component, ElementRef } from '@angular/core';
import { AppLayoutServiceService } from '../../services/app.layout.service.service';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem.component';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule,MenuitemComponent
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss'
})
export class DashboardSidebarComponent {
  model: any[] = [];

  constructor(public layoutService: AppLayoutServiceService,public el: ElementRef) { }

  ngOnInit() {
    this.model = [
      {
          label: 'الرئيسية',
          items: [
              { label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
          ]
      },
      {
          label: 'الأخبار',
          items: [
              { label: 'إدارة الأخبار', icon: 'pi pi-fw pi-book', routerLink: ['/news/manage'] },
              { label: 'إضافة خبر جديد', icon: 'pi pi-fw pi-plus', routerLink: ['/news/add'] }
          ]
      },
      {
          label: 'التصنيفات',
          items: [
              { label: 'إدارة التصنيفات', icon: 'pi pi-fw pi-tags', routerLink: ['/categories/manage'] },
              { label: 'إضافة تصنيف جديد', icon: 'pi pi-fw pi-tag', routerLink: ['/categories/add'] }
          ]
      },
      {
          label: 'التعليقات',
          items: [
              { label: 'إدارة التعليقات', icon: 'pi pi-fw pi-comments', routerLink: ['/comments/manage'] }
          ]
      },
      {
          label: 'المستخدمون',
          items: [
              { label: 'إدارة المستخدمين', icon: 'pi pi-fw pi-users', routerLink: ['/users/manage'] },
              { label: 'إضافة مستخدم جديد', icon: 'pi pi-fw pi-user-plus', routerLink: ['/users/add'] }
          ]
      },
      {
          label: 'الصفحات',
          items: [
              { label: 'حول الموقع', icon: 'pi pi-fw pi-info-circle', routerLink: ['/pages/about'] },
              { label: 'سياسة الخصوصية', icon: 'pi pi-fw pi-lock', routerLink: ['/pages/privacy-policy'] },
              { label: 'تواصل معنا', icon: 'pi pi-fw pi-envelope', routerLink: ['/pages/contact'] }
          ]
      },
      {
          label: 'الإعدادات',
          items: [
              { label: 'إعدادات الموقع', icon: 'pi pi-fw pi-cog', routerLink: ['/settings/site'] },
              { label: 'إعدادات الحساب', icon: 'pi pi-fw pi-user-edit', routerLink: ['/settings/account'] }
          ]
      },
      {
          label: 'التوثيق',
          items: [
              { label: 'المساعدة', icon: 'pi pi-fw pi-question-circle', routerLink: ['/help'] },
              { label: 'عرض الكود', icon: 'pi pi-fw pi-search', url: 'https://github.com/primefaces/sakai-ng', target: '_blank' }
          ]
      }
  ];

  }
}
