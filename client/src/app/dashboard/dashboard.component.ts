import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statsList = [
    {value: '0', type: 'applied', display: 'Total Jobs Applied For'},
    {value: '1', type: 'active', display: 'Total Jobs Active'},
    {value: '2', type: 'rejected', display: 'Total Jobs Rejected'},
    {value: '3', type: 'expired', display: 'Total Jobs Expired'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
