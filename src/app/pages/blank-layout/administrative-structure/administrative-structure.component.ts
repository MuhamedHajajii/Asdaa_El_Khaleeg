import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrative-structure',
  standalone: true,
  imports: [BlankNavbarComponent, CommonModule, AvatarModule],
  templateUrl: './administrative-structure.component.html',
  styleUrls: ['./administrative-structure.component.scss']
})
export class AdministrativeStructureComponent {
  structure: any[] = [
    { position: 'زاوية رئيس التحرير أصداء الخليج', name: 'سلمان بن أحمد العيد', department: 'الإدارة' },
    { position: 'نائب رئيس التحرير', name: 'أحمد خليل', department: 'الإدارة' },
    { position: 'صحفي أول', name: 'سارة حسن', department: 'السياسة' },
    { position: 'صحفي أول', name: 'عمر فتحي', department: 'الاقتصاد' },
    { position: 'رئيس قسم الإعلام الرقمي', name: 'ليلى أحمد', department: 'الإعلام' },
    { position: 'مدير وسائل التواصل الاجتماعي', name: 'خالد سعيد', department: 'الإعلام' },
  ];
}
