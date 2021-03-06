import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JobsModule } from './jobs/jobs.module';
// import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { JobAddComponent } from './jobs/job-add/job-add.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { JobGridComponent } from './jobs/job-grid/job-grid.component';
import { JobCardComponent } from './jobs/job-card/job-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { SeekerListComponent } from './seekers/seeker-list/seeker-list.component';
import { PhotoEditorComponent } from './seekers/photo-editor/photo-editor.component';
import { SeekerEditComponent } from './seekers/seeker-edit/seeker-edit.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { SeekerProfileComponent } from './seekers/seeker-profile/seeker-profile.component';
import { MessageDetailComponent } from './messages/message-detail/message-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobStatsComponent } from './dashboard/job-stats/job-stats.component';
import { NoteModalComponent } from './modals/note-modal/note-modal.component';
import { NotesListComponent } from './notes-list/notes-list.component';

// this decorator says that this file is an Angular module
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    // JobListComponent,
    JobDetailComponent,
    ListsComponent,
    MessagesListComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    JobAddComponent,
    JobEditComponent,
    JobsComponent,
    JobGridComponent,
    JobCardComponent,
    SeekerListComponent,
    PhotoEditorComponent,
    SeekerEditComponent,
    TextInputComponent,
    SeekerProfileComponent,
    MessageDetailComponent,
    DashboardComponent,
    JobStatsComponent,
    NoteModalComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    JobsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
