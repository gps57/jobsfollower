import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobPaginationComponent } from './job-pagination/job-pagination.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { JobsStatsComponent } from './jobs-stats/jobs-stats.component';

@NgModule({
  declarations: [JobListComponent, JobPaginationComponent, JobsDashboardComponent, JobsStatsComponent],
  exports: [JobListComponent],
  imports: [
      CommonModule,
      ReactiveFormsModule
  ]
})
export class JobsModule { }
