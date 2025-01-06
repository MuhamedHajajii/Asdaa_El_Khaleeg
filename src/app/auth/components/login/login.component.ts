import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { AppLayoutServiceService } from '../../../dashboard/services/app.layout.service.service';

import { ButtonModule } from 'primeng/button';

import { PasswordModule } from 'primeng/password';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,BlankNavbarComponent,        CommonModule,

    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,ReactiveFormsModule,
    PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public layoutService: AppLayoutServiceService) { }


  userData:FormGroup = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl('')
  })

  onSignInFormSubmitClick() {
    console.log(this.userData.value);
  }

}
