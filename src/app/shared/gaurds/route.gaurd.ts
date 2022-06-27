import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalModelService } from 'src/app/account/services/global-model.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGard implements CanActivate {
  constructor(private globalModalService: GlobalModelService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let canActivate = true;
    let neddedPermission = next.data['permission'] as string;

    //return (canActivate = userPermission?.id != undefined);

    this.globalModalService.initialDataFeteched.subscribe((response) => {
      if (this.globalModalService.logedInUser.id) {
        let userPermission =
          this.globalModalService.logedInUser.permissions?.find((x) =>
            x.name?.startsWith(neddedPermission)
          );
        if (userPermission?.id != undefined) {
          canActivate = true;
        } else {
          canActivate = false;
        }
      }
    });
    return canActivate;
  }
}
