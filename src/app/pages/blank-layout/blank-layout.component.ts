import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../core/components/blank-navbar/blank-navbar.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [BlankNavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {}
