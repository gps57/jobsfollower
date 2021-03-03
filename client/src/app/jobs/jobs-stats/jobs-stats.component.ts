import { Component, Input, OnInit } from '@angular/core';
import { JobsStats } from 'src/app/_models/jobsStats';

@Component({
  selector: 'app-jobs-stats',
  templateUrl: './jobs-stats.component.html',
  styleUrls: ['./jobs-stats.component.css']
})
export class JobsStatsComponent implements OnInit {
  @Input() jobsStats: JobsStats;

  constructor() { }

  ngOnInit(): void {
  }

}
