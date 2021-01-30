import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsStats } from '../_models/jobsStats';
import { JobsService } from '../_services/jobs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobsStats: JobsStats;
  statsList = [
    {value: '0', type: 'applied', display: 'Total Jobs Applied For'},
    {value: '1', type: 'responded', display: 'Total Responses'},
    {value: '2', type: 'active', display: 'Total Active Applications'},
    {value: '3', type: 'rejected', display: 'Total Rejected'}
  ];
  jobsCount: number = 0;

  constructor(private jobService: JobsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.jobsStats = data.jobsStats;
      console.log("Dashboard ngOnInit(): ", this.jobsStats);
    })    
  }

  updateStats(newParams: JobsStats) {
    this.jobsStats = newParams;
    console.log("dashboard updateStats(): ", this.jobsStats);
  }
}
