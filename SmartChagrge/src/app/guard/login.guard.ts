import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    const token = localStorage.getItem('TOKEN');
    if (token !== null && token.length > 0) {
      return true;
    }

    // Navigate to the login page with extras
    if (url === '/login') {
      return true;
    }
    this.router.navigate(['/login']);
    return true;
  }
}
