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
import { ApiServiceService } from '../services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      route.routeConfig?.path == 'dashboard' &&
      localStorage.getItem('isAdminLoggedIn') == 'true'
    ) {
      return true;
    } else if (
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
