import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-about-us-control',
  standalone: true,
  imports: [EditorModule, CommonModule, FormsModule],
  templateUrl: './about-us-control.component.html',
  styleUrls: ['./about-us-control.component.scss'],
})
export class AboutUsControlComponent {
  // Initially set to false to show the content in view-only mode
  isEditing: boolean = false;

  aboutUsContent: any = {
    main: `صحيفة اخبارية سعودية تلتزم بثوابت الدين و الوطن و تعبر عن شرائح المجتمع
    المختلفة دون تمييز لها رؤيتها الواضحة و رسالتها المحددة و منهجها المحافظ
    تحرص على المهنية فى الاداء و الشفافية و الموضوعية فى الطرح كما نعمل جاهدين
    بتوفيق الله على تلمس اختياجات المواطن و ايصال صوته الى المسؤول مباشرة
    متخطين الروتين الممل و المعقد من اجل الوصول الى الهدغ المنشودبأقصر الطرق و
    بمدة زمنية قصيرة و بما يحقق الرفاهيه للمواطن غى المدينة و القرية و الهجرة`,

    slogan: `شعارنا منكم و اليكم`,

    first_title: `رؤيتنا`,

    first_title_content: `
    النهوض بالمعارف الاعلامية و تحقيق الريادة و التمييز على كل الاصعدة اسهاما
    فى النهضة الوطنية و التنمية الشاملة`,

    second_title: `رسالتنا`,

    second_title_content: `تنمية القطاع من خلال بناء القدرات العلمية فى مجال الاعلام و الاتصال
    الجماهيري و تطوير الاداء من خلال تنشئة كوادر متميزة تسهم فى الحفاظ على
    هوية الامة و ثقافة المجتمع و دعم المخترعين و المبتكرين من خلال ابراز
    ابداعاتهم`,

    third_title: `الاهداف`,

    third_title_content: [
      `المشاركة فى المناسبات الوطنية و المبادرات المحلية ز الانشطة المختلفة فى
      خدمة المجتمع`,

      `تعزيز خطوط التواصل فى المجتمع`,

      `تطوير المهارات بما يستحب للمتطلبات المهنية و الوظيفية`,

      `الكشف عن المواهب الكتابية العامة و للشباب خاصة`,

      `تفعيل دور الشراكة و جذب مؤسسات المجتمع المختلفة`,

      `ابراز الشباب السعودى المخترع و المبتكر و المبدع و دعمهم`,

      `تقديم برامج تسهم غر رفع الكفاءة و الفعالية العالية و تعزز روح التعاون
      الايجابى و تنمى القدرة على تحمل المسئولية من خلال داء المهام المختلفة`,
    ],
  };

  // Function to update content after editing
  updateContent(field: string, event: Event) {
    const newValue = (event.target as HTMLElement).innerText;
    this.aboutUsContent[field] = newValue;
    console.log(`${field} updated to:`, newValue);
  }

  // Function to update list content
  updateListContent(index: number, event: Event) {
    const newValue = (event.target as HTMLElement).innerText;
    this.aboutUsContent.third_title_content[index] = newValue;
    console.log(`List item ${index} updated to:`, newValue);
  }

  // Function to toggle editing mode and save the changes
  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  // Save changes and exit the editor
  saveChanges() {
    // Here you can handle the actual save operation, e.g., making an API call.
    console.log('Changes saved:', this.aboutUsContent);
    this.isEditing = false; // Switch back to non-editable state
  }
}
