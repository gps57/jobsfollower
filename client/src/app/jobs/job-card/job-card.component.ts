import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  // @Input() is used here because this data is coming from the parent component.  This is the syntax to make that happen.
  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }

}
