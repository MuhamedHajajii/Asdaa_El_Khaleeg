import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlankNavbarComponent } from '../../../../core/components/blank-navbar/blank-navbar.component';
import { IBlog } from '../../../../core/interfaces/IBlog';
import { HijriDatePipe } from '../../../../core/pipes/date-hijri.pipe';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { CategoriesService } from '../../../../core/services/content/categories.service';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';
import { RelatedContentComponent } from '../related-content/related-content.component';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

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
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _ToastrService: ToastrService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInitialId();
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

  // changeMeta(): void {
  //   this.router.events
  //   .pipe(
  //     filter((event) => event instanceof NavigationEnd),
  //     map(() => this.activatedRoute),
  //     map((route) => {
  //       while (route.firstChild) {
  //         route = route.firstChild;
  //       }
  //       return route;
  //     }),
  //     mergeMap((route) => route.data)
  //   )
  //   .subscribe((data) => {
  //     this.titleService.setTitle(
  //       data['title'] || 'SUMMIT Online School - ساميت اونلاين سكول'
  //     );
  //     this.metaService.updateTag({
  //       name: 'description',
  //       content:
  //         data['description'] ||
  //         'تقدم الشركة خدماتها و تساعد الأفراد من مختلف الأعمار في تحقيق رؤيتهم بتوفير تعليم وتدريب عالي الجودة  مقر الشركة في الرياض بالمملكة العربية السعودية',
  //     });
  //   });
  // }
}
