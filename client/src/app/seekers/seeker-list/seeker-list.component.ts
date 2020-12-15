import { Component, OnInit } from '@angular/core';
import { Seeker } from 'src/app/_models/seeker';
import { SeekersService } from 'src/app/_services/seekers.service';

@Component({
  selector: 'app-seeker-list',
  templateUrl: './seeker-list.component.html',
  styleUrls: ['./seeker-list.component.css']
})
export class SeekerListComponent implements OnInit {
  seekers: Seeker[];

  constructor(private seekerService: SeekersService) { }

  ngOnInit(): void {
  }

  loadSeekers() {
    this.seekerService.getSeekers().subscribe(seekers => {
      this.seekers = seekers;
    })
  }

}
