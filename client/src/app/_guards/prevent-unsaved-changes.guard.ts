import { MemberEditComponent } from './../components/members/member-edit/member-edit.component';
import { Injectable, Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editForm.dirty){
      return confirm('Ary You sure to continue?  Any Unsaved changed will be lost')
    }
    return true;
 
    
  }
  
}
