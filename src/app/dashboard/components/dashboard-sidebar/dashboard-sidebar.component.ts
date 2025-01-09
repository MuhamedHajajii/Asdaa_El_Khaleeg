import { Component, ElementRef } from '@angular/core';
import { AppLayoutServiceService } from '../../services/app.layout.service.service';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem.component';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, MenuitemComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss',
})
export class DashboardSidebarComponent {
  model: any[] = [];

  constructor(
    public layoutService: AppLayoutServiceService,
    public el: ElementRef
  ) {}

  ngOnInit() {
    this.model = [
      {
        label: 'الرئيسية',
        items: [
          {
            label: 'لوحة التحكم',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },
        ],
      },
      {
        label: 'الأخبار',
        items: [
          {
            label: 'إدارة الأخبار',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/dashboard/news-control'],
          },
          {
            label: 'إضافة خبر جديد',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/dashboard/news-add'],
          },
        ],
      },
      {
        label: 'التصنيفات',
        items: [
          {
            label: 'إدارة التصنيفات',
            icon: 'pi pi-fw pi-tags',
            routerLink: ['/dashboard/slugs-control'],
          },
          {
            label: 'إضافة تصنيف جديد',
            icon: 'pi pi-fw pi-tag',
            routerLink: ['/dashboard/slugs-add'],
          },
        ],
      },
      {
        label: 'التعليقات',
        items: [
          {
            label: 'إدارة التعليقات',
            icon: 'pi pi-fw pi-comments',
            routerLink: ['/dashboard/comments'],
          },
        ],
      },
      {
        label: 'المؤلفين',
        items: [
          {
            label: 'إدارة المؤلفين',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/dashboard/users-control'],
          },
        ],
      },
      {
        label: 'الصفحات',
        items: [
          {
            label: 'حول الموقع',
            icon: 'pi pi-fw pi-info-circle',
            routerLink: ['/dashboard/about-us'],
          },
          {
            label: 'سياسة الخصوصية',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/dashboard/privacy-policy'],
          },
          {
            label: 'تواصل معنا',
            icon: 'pi pi-fw pi-envelope',
            routerLink: ['/dashboard/contact-us'],
          },
        ],
      },
      {
        label: 'روابط السوشيال ميديا',
        items: [
          {
            label: 'إدارة الروابط',
            icon: 'pi pi-fw pi-share-alt',
            routerLink: ['/dashboard/social-media-control'],
          },
        ],
      },
      {
        label: 'الإعدادات',
        items: [
          {
            label: 'إعدادات الموقع',
            icon: 'pi pi-fw pi-cog',
          },
          {
            label: 'إعدادات الحساب',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: ['/dashboard/account-setting'],
          },
        ],
      },
      {
        label: 'التوثيق',
        items: [
          {
            label: 'المساعدة',
            icon: 'pi pi-fw pi-question-circle',
            routerLink: ['/dashboard/help'],
          },
        ],
      },
    ];
  }
}
