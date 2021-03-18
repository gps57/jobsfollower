import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { JobsStore } from '../jobs.store';

@Component({
  selector: 'app-job-pagination',
  templateUrl: './job-pagination.component.html',
  styleUrls: ['./job-pagination.component.css']
})
export class JobPaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  jobsPagination: Pagination;
  currentPage: number = 1;

  constructor(private jobsStore: JobsStore) {
    this.jobsPagination = this.pagination;
  }

  ngOnInit(): void {
  }

  pageChanged(event: any){
    console.log("PageChanged: ", event);
  }

}
