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
        path: 'categories',
        loadComponent: () =>
          import('./pages/blank-layout/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./pages/blank-layout/articles/articles.component').then(
            (c) => c.ArticlesComponent
          ),
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
    path: '**',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
