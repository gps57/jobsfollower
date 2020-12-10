import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
  }

  displayAsList (b: boolean) {
    this.jobService.displayJobsAsList(b);
  }

  isDisplayList(): boolean {
    return this.jobService.isDisplayList();
  }

}
