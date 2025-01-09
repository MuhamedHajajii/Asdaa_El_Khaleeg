import { Component } from '@angular/core';
import { Writer } from '../../../../../core/interfaces/slider/IWriter';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel binding
import { ButtonModule } from 'primeng/button'; // For pButton
import { TableModule } from 'primeng/table'; // For pTable
import { DialogModule } from 'primeng/dialog'; // For pDialog
import { ToastModule } from 'primeng/toast'; // For p-toast
import { InputTextModule } from 'primeng/inputtext'; // For pInputText
import { InputSwitchModule } from 'primeng/inputswitch'; // Ensure this is imported
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';

@Component({
  selector: 'app-users-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    InputSwitchModule, // Import the InputSwitchModule
    HijriDatePipe,
  ],
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.scss'],
  providers: [MessageService],
})
export class UsersControlComponent {
  writers: Writer[] = []; // Array to store the list of writers
  cols!: any[];
  selectedWriter: Writer = {} as Writer;
  writerDialog: boolean = false;
  deleteWriterDialog: boolean = false;
  submitted: boolean = false;
  selectedWriters: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'معرف' },
      { field: 'writer_name', header: 'اسم الكاتب' },
      { field: 'writer_status', header: 'الحالة' },
      { field: 'created_at', header: 'تاريخ الإنشاء' },
      { field: 'updated_at', header: 'تاريخ التحديث' },
    ];
    this.loadWriters();
  }

  loadWriters() {
    // Simulate fetching data from an API
    this.writers = [
      {
        id: 1,
        writer_name: 'Khalfia',
        writer_status: 0,
        created_at: '2025-01-08 16:04:47',
        updated_at: '2025-01-08 16:10:36',
      },
      {
        id: 2,
        writer_name: 'Sara',
        writer_status: 1,
        created_at: '2024-12-15 10:20:10',
        updated_at: '2024-12-15 10:25:05',
      },
      {
        id: 3,
        writer_name: 'Mohamed',
        writer_status: 1,
        created_at: '2023-11-02 14:30:20',
        updated_at: '2023-11-02 14:35:00',
      },
      {
        id: 4,
        writer_name: 'Ali',
        writer_status: 1,
        created_at: '2022-05-30 09:00:00',
        updated_at: '2022-06-10 12:15:00',
      },
      {
        id: 5,
        writer_name: 'Layla',
        writer_status: 0,
        created_at: '2023-08-18 17:05:55',
        updated_at: '2023-08-18 17:15:30',
      },
    ];
  }

  openAddWriterDialog() {
    this.selectedWriter = {} as Writer; // Reset selected writer
    this.writerDialog = true;
  }

  saveWriter() {
    this.submitted = true;
    if (this.selectedWriter.writer_name) {
      if (this.selectedWriter.id) {
        // Update existing writer
        const index = this.writers.findIndex(
          (writer) => writer.id === this.selectedWriter.id
        );
        this.writers[index] = this.selectedWriter;
      } else {
        // Add new writer
        this.selectedWriter.id = this.writers.length + 1; // Generate a new ID
        this.writers.push(this.selectedWriter);
      }
      this.writerDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'تم الحفظ',
        detail: 'تم حفظ البيانات بنجاح',
      });
    }
  }

  editWriter(writer: Writer) {
    this.selectedWriter = { ...writer }; // Copy the writer data for editing
    this.writerDialog = true;
  }

  deleteWriter(writer: Writer) {
    this.selectedWriter = writer;
    this.deleteWriterDialog = true;
  }

  confirmDeleteWriter() {
    const index = this.writers.indexOf(this.selectedWriter);
    if (index > -1) {
      this.writers.splice(index, 1); // Remove the writer
      this.deleteWriterDialog = false;
      this.messageService.add({
        severity: 'error',
        summary: 'تم الحذف',
        detail: 'تم حذف الكاتب بنجاح',
      });
    }
  }

  hideDialog() {
    this.writerDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  // Using the p-inputSwitch to toggle the writer's status
  toggleStatus(writer: Writer) {
    // Toggle between 0 and 1
    writer.writer_status = writer.writer_status === 0 ? 1 : 0;
  }
}
