import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-stats',
  templateUrl: './job-stats.component.html',
  styleUrls: ['./job-stats.component.css']
})
export class JobStatsComponent implements OnInit {
  @Input() statValue: string;
  @Input() statDisplay: string;


  constructor() { }

  ngOnInit(): void {
  }

}
