import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Seeker } from 'src/app/_models/seeker';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SeekersService } from 'src/app/_services/seekers.service';

@Component({
  selector: 'app-seeker-edit',
  templateUrl: './seeker-edit.component.html',
  styleUrls: ['./seeker-edit.component.css']
})

export class SeekerEditComponent implements OnInit {
  seeker: Seeker;
  user: User;
  @ViewChild('editForm') editForm: NgForm;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private seekerService: SeekersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadSeeker();
  }

  loadSeeker() {
    this.seekerService.getSeeker(this.user.username).subscribe(seeker => {
      this.seeker = seeker;
    })
  }

  canDeactivate() {
    if (this.editForm.dirty){
      return confirm('Are you sure you want stop editing seeker? Any unsaved changes will be lost.');
    }
    return true;
  }

}
