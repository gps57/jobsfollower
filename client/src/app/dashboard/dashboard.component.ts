import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statsList = [
    {value: 'applied', display: 'Total Jobs Applied For'},
    {value: 'active', display: 'Total Jobs Active'},
    {value: 'rejected', display: 'Total Jobs Rejected'},
    {value: 'expired', display: 'Total Jobs Expired'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
