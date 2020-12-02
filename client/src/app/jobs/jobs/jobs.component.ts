import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  listDisplay : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay (display: boolean) {
    this.listDisplay = display;
  }

}
