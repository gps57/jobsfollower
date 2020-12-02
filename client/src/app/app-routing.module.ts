import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { JobAddComponent } from './jobs/job-add/job-add.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'jobs', component: JobsComponent},
      {path: 'jobs/:id', component: JobDetailComponent},
      {path: 'job/add', component: JobAddComponent, pathMatch: 'full'},
      {path: 'job/edit/:id', component: JobEditComponent, pathMatch: 'full'},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
