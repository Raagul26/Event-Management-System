import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HOME } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      (route.routeConfig?.path == 'profile' ||
        route.routeConfig?.path == 'bookedEvents') &&
      localStorage.getItem('isUserLoggedIn') == 'true'
    ) {
      return true;
    } else {
      this.router.navigate([HOME]);
      return false;
    }
  }
}
