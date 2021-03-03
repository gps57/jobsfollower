import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { JobAddComponent } from './jobs/job-add/job-add.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobsDashboardComponent } from './jobs/jobs-dashboard/jobs-dashboard.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { ListsComponent } from './lists/lists.component';
import { MessageDetailComponent } from './messages/message-detail/message-detail.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { SeekerEditComponent } from './seekers/seeker-edit/seeker-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { JobsStatsResolver } from './_resolvers/jobs-stats.resolver';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  {path: '', component: DashboardComponent, resolve : {jobsStats: JobsStatsResolver}},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'jobs', component: JobsComponent},
      {path: 'jobs/:id', component: JobDetailComponent},
      {path: 'job/add', component: JobAddComponent, pathMatch: 'full'},
      {path: 'job/edit/:id', component: JobEditComponent, canDeactivate: [PreventUnsavedChangesGuard], pathMatch: 'full'},
      {path: 'seeker/edit', component: SeekerEditComponent, canDeactivate: [PreventUnsavedChangesGuard], pathMatch: 'full'},
      {path: 'test', component: JobsDashboardComponent},
      {path: 'messages', component: MessagesListComponent},
      {path: 'messages/:id', component: MessageDetailComponent},
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
