import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import { filter, map, switchMap } from 'rxjs';
import { BlankNavbarComponent } from '../../../../core/components/blank-navbar/blank-navbar.component';
import { IBlog } from '../../../../core/interfaces/IBlog';
import { HijriDatePipe } from '../../../../core/pipes/date-hijri.pipe';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { CategoriesService } from '../../../../core/services/content/categories.service';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';
import { RelatedContentComponent } from '../related-content/related-content.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    AdvertisingAreaComponent,
    RelatedContentComponent,
    ReactiveFormsModule,
    BlankNavbarComponent,
    CommonModule,
    HijriDatePipe,
    SafeHtmlPipe,
    ImagesSrcPipe,
    RouterLink,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  currentId!: string;
  IBlogs!: IBlog;
  userComments: string = '';
  isStoreData: boolean = false;
  isShowSkeleton = true;
  masterBlog!: any;

  @ViewChild('isStoreDataInput') isStoreDataInput!: ElementRef;
  @ViewChild('stickySection') stickySection!: ElementRef;
  constructor(
    private _CategoriesService: CategoriesService,
    private _ActivatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _ToastrService: ToastrService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.location.href) {
      const canonicalUrl = window.location.href;

      // ✅ Find and remove existing canonical tag
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // ✅ Add the new canonical tag
      this.metaService.addTag({ rel: 'canonical', href: canonicalUrl });
    }

    this.getInitialId();
    this.changeMeta();
    this.onClickGetLastEditorNewsId();
  }

  ngAfterContentInit(): void {
    this.checkForUserDataInLocalStorage();
  }

  getInitialId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          this.currentId = id;
          console.log('Active Route ID (Reload):', this.currentId);
          this.getCurrentBlog(this.currentId);
        }
      },
    });
  }

  getCurrentBlog(blogId: string): void {
    this.isShowSkeleton = true;
    this._CategoriesService.getBlogById(blogId).subscribe({
      next: (response) => {
        console.log(response, 'current blog details');
        this.IBlogs = response as IBlog;
        this.isShowSkeleton = false;

        // Update meta tags after the blog data is loaded
        this.changeMeta();
      },
      error: (err) => console.error('Error fetching category:', err),
    });
  }

  onClickGetLastEditorNewsId(): void {
    this._CategoriesService.getEditorBlog().subscribe({
      next: (response) => {
        this.masterBlog = response;
        console.log(response.blogs[0].post_id);
        console.log(response.blogs[0].post_title);
        // this._Router.navigate([`/details`, response.blogs[0].post_id]);
      },
    });
  }

  userDataForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userComment: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
    ]),
  });

  saveData(event: Event): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let inputSaveData = event.target as HTMLInputElement;
      if (inputSaveData.checked) {
        console.log('savait');
        this.isStoreData = true;
      } else {
        this.isStoreData = false;
        localStorage.removeItem('userData');
      }
    }
  }

  storeData() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userName: this.userNameForm?.value,
          userEmail: this.userEmailForm?.value,
        })
      );
    }
  }

  onSubmitComment(): void {
    if (this.userDataForm.valid) {
      console.log(this.userDataForm.value);

      if (this.isStoreData) {
        this.storeData();
      }

      this._ToastrService.success('تم ارسال التعليق بنجاح');
      this.userDataForm.reset();
    } else {
      this.userDataForm.markAllAsTouched();
      this._ToastrService.error('تحقق من البيانات المدخلة');
    }
  }

  checkForUserDataInLocalStorage(): boolean {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let userData = localStorage.getItem('userData');
      if (userData) {
        if (this.isStoreDataInput)
          this.isStoreDataInput.nativeElement.checked = true;
        this.isStoreData = true;
        let currentData = JSON.parse(userData);
        Object.keys(currentData).forEach((key) => {
          this.userDataForm.get(key)?.setValue(currentData[key]);
        });
      }
      return true;
    }
    if (this.isStoreDataInput)
      this.isStoreDataInput.nativeElement.checked = false;
    return false;
  }

  get userNameForm() {
    return this.userDataForm.get('userName');
  }
  get userEmailForm() {
    return this.userDataForm.get('userEmail');
  }
  get userCommentForm() {
    return this.userDataForm.get('userComment');
  }

  changeMeta(): void {
    if (this.IBlogs?.blog?.post_title && this.IBlogs?.blog?.post_content) {
      this.titleService.setTitle(this.IBlogs.blog.post_title);

      // Use the first 150 characters of the post content for the description
      // Clean and decode the post content
      const metaDescription = this.decodeHtml(
        this.IBlogs.blog.post_content.replace(/<[^>]+>/g, '').slice(0, 150)
      );

      this.metaService.updateTag({
        name: 'description',
        content: metaDescription,
      });
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._ActivatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        switchMap((route) => route.data)
      )
      .subscribe((data) => {
        const metaDescription =
          data['description'] ||
          this.IBlogs?.blog?.post_content
            ?.replace(/<[^>]+>/g, '')
            .slice(0, 150);

        this.titleService.setTitle(
          data['title'] || this.IBlogs?.blog?.post_title
        );
        this.metaService.updateTag({
          name: 'description',
          content: metaDescription,
        });
      });
  }
  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}
