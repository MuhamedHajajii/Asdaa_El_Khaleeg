import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  const platformId = inject(PLATFORM_ID); // Correctly inject PLATFORM_ID

  let userToken: string | null = null;

  // Check if running on a browser platform
  if (isPlatformBrowser(platformId)) {
    userToken = localStorage.getItem('user'); // Only access localStorage in the browser
  }

  if (userToken) {
    return true; // Allow access if token exists
  } else {
    _Router.navigate(['/login']); // Navigate to login
    return false; // Deny access
  }
};
