import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { BlankLayoutComponent } from "../blank-layout.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [BlankNavbarComponent, BlankLayoutComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  privacy_policy = {
    slogan: `نلتزم بحماية خصوصيتك وبياناتك الشخصية`,
    first_title: `سياسة الخصوصية`,
    first_title_content: `
      نرحب بكم في موقعنا الإخباري، ونؤكد أن خصوصيتك وأمان بياناتك الشخصية هما من أولوياتنا الأساسية. تهدف سياسة الخصوصية هذه إلى توضيح كيفية جمع المعلومات واستخدامها وحمايتها عند زيارتك لموقعنا.`,
    second_title: `المعلومات التي نجمعها`,
    second_title_content: `
      نحن نقوم بجمع نوعين من المعلومات:
      - معلومات تقدمها لنا بشكل مباشر مثل بيانات التسجيل أو التعليقات.
      - معلومات يتم جمعها تلقائياً مثل عنوان IP، نوع المتصفح، وتفضيلات التصفح.`,
    third_title: `كيفية استخدام المعلومات`,
    third_title_content: [
      `تقديم المحتوى الإخباري وتحسين تجربة المستخدم.`,
      `الرد على استفسارات القراء وتعليقاتهم.`,
      `إرسال التنبيهات الإخبارية والتحديثات.`,
      `تحليل بيانات الاستخدام لفهم اهتمامات الزوار وتطوير الخدمات.`,
      `الالتزام بالمتطلبات القانونية والتنظيمية.`,
    ],
    fourth_title: `حماية المعلومات`,
    fourth_title_content: `
      نحن نتخذ تدابير أمنية لحماية بياناتك من الوصول غير المصرح به أو التعديل غير القانوني أو الإتلاف. تشمل هذه التدابير استخدام تقنيات التشفير والبروتوكولات الآمنة.`,
    fifth_title: `حقوق المستخدم`,
    fifth_title_content: [
      `الحق في معرفة كيفية استخدام بياناتك.`,
      `الحق في طلب تصحيح أو تحديث معلوماتك الشخصية.`,
      `الحق في طلب حذف بياناتك إذا لم تعد هناك حاجة إليها.`,
      `الحق في الاعتراض على استخدام بياناتك لأغراض التسويق.`,
    ],
    sixth_title: `ملفات تعريف الارتباط (Cookies)`,
    sixth_title_content: `
      يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح وتخصيص المحتوى. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال إعدادات المتصفح.`,
    seventh_title: `التعديلات على سياسة الخصوصية`,
    seventh_title_content: `
      نحن نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. سيتم إخطار المستخدمين بأي تغييرات كبيرة من خلال الموقع.`,
  };

}
