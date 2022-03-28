import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN } from '../app.model';
import { ApiServiceService } from '../services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    }
    this.router.navigate([LOGIN])
    return false;
  }
}
