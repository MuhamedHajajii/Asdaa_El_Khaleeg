import { Routes } from '@angular/router';
import { loginGuard } from './auth/gurd/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/blank-layout/blank-layout.component').then(
        (c) => c.BlankLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/blank-layout/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'archives',
        loadComponent: () =>
          import('./pages/blank-layout/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        children: [
          {
            path: 'blogs/:id',
            loadComponent: () =>
              import(
                './pages/blank-layout/categories/blogs/blogs.component'
              ).then((c) => c.BlogsComponent),
          },
          {
            path: 'article/:id',
            loadComponent: () =>
              import(
                './pages/blank-layout/categories/articles/articles.component'
              ).then((c) => c.ArticlesComponent),
          },
          {
            path: 'search/:id',
            loadComponent: () =>
              import(
                './pages/blank-layout/categories/search-results/search-results.component'
              ).then((c) => c.SearchResultsComponent),
          },
        ],
      },
      // detail
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './pages/blank-layout/categories/details/details.component'
          ).then((c) => c.DetailsComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/blank-layout/contact-us/contact-us.component').then(
            (c) => c.ContactUsComponent
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./pages/blank-layout/about-us/about-us.component').then(
            (c) => c.AboutUsComponent
          ),
      },
      {
        path: 'administrative-structure',
        loadComponent: () =>
          import(
            './pages/blank-layout/administrative-structure/administrative-structure.component'
          ).then((c) => c.AdministrativeStructureComponent),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import(
            './pages/blank-layout/privacy-policy/privacy-policy.component'
          ).then((c) => c.PrivacyPolicyComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './dashboard/components/dashboard-home/dashboard-home.component'
      ).then((c) => c.DashboardHomeComponent),
    canActivate: [loginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/main-control/dashboard-home-layout/dashboard-home-layout.component'
          ).then((c) => c.DashboardHomeLayoutComponent),
      },
      {
        path: 'news-control',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/news-control/news-control/news-control.component'
          ).then((c) => c.NewsControlComponent),
      },
      {
        path: 'news-add',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/news-control/news-add/news-add.component'
          ).then((c) => c.NewsAddComponent),
      },
      {
        path: 'news-add/:id',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/news-control/news-add/news-add.component'
          ).then((c) => c.NewsAddComponent),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/comments-control/comments-control/comments-control.component'
          ).then((c) => c.CommentsControlComponent),
      },
      {
        path: 'users-control',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/users-control/users-control/users-control.component'
          ).then((c) => c.UsersControlComponent),
      },
      {
        path: 'social-media-control',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/social-media-control/social-media-control.component'
          ).then((c) => c.SocialMediaControlComponent),
      },

      {
        path: 'about-us',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/pages-control/about-us-control/about-us-control.component'
          ).then((c) => c.AboutUsControlComponent),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/pages-control/privacy-policy/privacy-policy.component'
          ).then((c) => c.PrivacyPolicyComponent),
      },
      {
        path: 'administrator',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/pages-control/employees-control/employees-control.component'
          ).then((c) => c.EmployeesControlComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/pages-control/contact-us/contact-us.component'
          ).then((c) => c.ContactUsComponent),
      },
      {
        path: 'account-setting',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/settings-control/setting-control/setting-control.component'
          ).then((c) => c.SettingControlComponent),
      },
      {
        path: 'help',
        loadComponent: () =>
          import(
            './dashboard/components/dashboard-home/verifications-control/verifications-help/verifications-help.component'
          ).then((c) => c.VerificationsHelpComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
