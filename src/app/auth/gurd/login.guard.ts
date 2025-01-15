import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if running in the browser
  if (isPlatformBrowser(platformId)) {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      return true; // Allow access if token exists
    } else {
      _Router.navigate(['/login']);
      return false; // Deny access if token is absent
    }
  }

  // If running on the server or any other platform, allow navigation without checking token
  return true; // Allow access for SSR rendering or other platforms
};
