import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { JobsStore } from '../jobs.store';

@Component({
  selector: 'app-job-pagination',
  templateUrl: './job-pagination.component.html',
  styleUrls: ['./job-pagination.component.css']
})
export class JobPaginationComponent implements OnInit {
  pagination: Pagination;

  constructor(private jobsStore: JobsStore) {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 60,
      totalPages: 12
    }
  }

  ngOnInit(): void {
  }

}
