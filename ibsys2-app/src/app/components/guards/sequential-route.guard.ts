// src/app/guards/sequential-route.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavigationProgressService } from '../../services/navigation-progress.service';

export const sequentialRouteGuard: CanActivateFn = (route, state) => {
  const navigationProgressService = inject(NavigationProgressService);
  const router = inject(Router);

  const targetPath = state.url.substring(1);

  if (navigationProgressService.isRouteAccessible(targetPath)) {
    return true;
  }

  const availableRoute = navigationProgressService.getNextRoutePath() || 'xml-upload';
  return router.createUrlTree([availableRoute]);
};
