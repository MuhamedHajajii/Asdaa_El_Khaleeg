import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HijriDatePipe } from '../../pipes/date-hijri.pipe';
import { SearchBlogsService } from '../../services/content/home/search-blogs.service';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink, HijriDatePipe],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss',
})
export class BlankNavbarComponent {
  nowDate = new Date();

  constructor(
    private _SearchBlogsService: SearchBlogsService,
    private _Router: Router
  ) {}

  searchResults(searchResult: string): void {
    console.log(searchResult);
    this._Router.navigate([`/archives/search`, searchResult]);
  }
}
