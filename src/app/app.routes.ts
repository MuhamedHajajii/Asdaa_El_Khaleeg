import { Routes } from '@angular/router';

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
      import('./dashboard/components/dashboard-home/dashboard-home.component').then(
        (c) => c.DashboardHomeComponent
      ),children:[
        {
          path: '',
          loadComponent: () =>
            import('./dashboard/components/dashboard-home/main-control/dashboard-home-layout/dashboard-home-layout.component').then(
              (c) => c.DashboardHomeLayoutComponent
            ),
        },
        {
          path: 'news-control',
          loadComponent: () =>
            import('./dashboard/components/dashboard-home/news-control/news-control/news-control.component').then(
              (c) => c.NewsControlComponent
            ),
        },
        {
          path: 'news-add',
          loadComponent: () =>
            import('./dashboard/components/dashboard-home/news-control/news-add/news-add.component').then(
              (c) => c.NewsAddComponent
            ),
        },
        {
          path: 'news-control',
          loadComponent: () =>
            import('./dashboard/components/dashboard-home/news-control/news-add/news-add.component').then(
              (c) => c.NewsAddComponent
            ),
        },
      ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
