import { componentFactoryName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JobEditComponent } from '../jobs/job-edit/job-edit.component';
import { SeekerEditComponent } from '../seekers/seeker-edit/seeker-edit.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {

  // this version is an implementation from a YouTube tutorial that can be used for any component
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  // this version is from the udemy course (app with angular and core) I'm working through
  // It does not work for any and all forms.  Only the "JobEdit Component" (my implementation)
  // or the MemberEdit component (DatingApp implementation).
  // ---
  // canDeactivate(component: JobEditComponent): boolean {
  //   if (component.editForm.dirty){
  //     return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
  //   }
  //   return true;
  // }

}
