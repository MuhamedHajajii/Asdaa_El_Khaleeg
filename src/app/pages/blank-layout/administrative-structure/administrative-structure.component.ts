import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../dashboard/services/employees.service';
import { IEmployeeRow } from '../../../core/interfaces/IEmployess';

@Component({
  selector: 'app-administrative-structure',
  standalone: true,
  imports: [BlankNavbarComponent, CommonModule, AvatarModule],
  templateUrl: './administrative-structure.component.html',
  styleUrls: ['./administrative-structure.component.scss'],
})
export class AdministrativeStructureComponent {
  structure!: IEmployeeRow[];
  constructor(private _EmployeesService: EmployeesService) {}

  ngOnInit(): void {
    this._EmployeesService.getAllEmployees().subscribe({
      next: (response) => {
        this.structure = response.rows;
      },
    });
  }
}
