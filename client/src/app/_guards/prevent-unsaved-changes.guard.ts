import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JobEditComponent } from '../jobs/job-edit/job-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: JobEditComponent): boolean {
    if (component.editForm.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }
  
}
