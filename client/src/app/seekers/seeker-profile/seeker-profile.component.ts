import { Component, Input, OnInit } from '@angular/core';
import { Seeker } from 'src/app/_models/seeker';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SeekersService } from 'src/app/_services/seekers.service';

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrls: ['./seeker-profile.component.css']
})
export class SeekerProfileComponent implements OnInit {
  @Input() seeker: Seeker;

  constructor() { }

  ngOnInit(): void {
  }

}
