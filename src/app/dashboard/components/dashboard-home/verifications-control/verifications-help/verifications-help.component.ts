import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JoditAngularModule } from 'jodit-angular';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-verifications-help',
  standalone: true,
  imports: [JoditAngularModule, FormsModule, SplitterModule],
  templateUrl: './verifications-help.component.html',
  styleUrl: './verifications-help.component.scss',
})
export class VerificationsHelpComponent {
  content: string = '';
  config: any = {};

  ngOnInit(): void {
    this.config = {
      zIndex: 0,
      readonly: false,
      activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
      toolbarButtonSize: 'middle',
      theme: 'default',
      saveModeInCookie: false,
      spellcheck: true,
      editorCssClass: false,
      triggerChangeEvent: true,
      width: '100%', // Set width to 100% to fill the container
      height: '100%', // Set height to 100% to fill the container
      minHeight: 100,
      language: 'auto',
      toolbar: true,
      enter: 'P',
      useSplitMode: false,
      colors: {
        greyscale: [
          '#000000',
          '#434343',
          '#666666',
          '#999999',
          '#B7B7B7',
          '#CCCCCC',
          '#D9D9D9',
          '#EFEFEF',
          '#F3F3F3',
          '#FFFFFF',
        ],
        palette: [
          '#980000',
          '#FF0000',
          '#FF9900',
          '#FFFF00',
          '#00F0F0',
          '#00FFFF',
          '#4A86E8',
          '#0000FF',
          '#9900FF',
          '#FF00FF',
        ],
      },
      buttons: [
        'source',
        '|',
        'bold',
        'strikethrough',
        'underline',
        'italic',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'video',
        'table',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'symbol',
        'fullsize',
        'print',
        'about',
      ],
    };
  }

  printValue(editor: any) {
    console.log(editor.value);
  }
}
