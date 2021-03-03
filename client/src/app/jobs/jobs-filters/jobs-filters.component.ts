import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobParams } from 'src/app/_models/jobParams';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.css']
})
export class JobsFiltersComponent implements OnInit {

  @Output() jParamsChange: EventEmitter<JobParams> = new EventEmitter<JobParams>();

  jobsFilters: FormGroup;

  sortByList = [
    {value: 'created', display: 'Created Date'},
    {value: 'title', display: 'Job Title'},
    {value: 'company', display: 'Company'}
  ];

  constructor(private formBuilder: FormBuilder) {

    this.jobsFilters = this.formBuilder.group({
      title: [''],
      company: [''],
      sortBy: ['']
    });

  }

  ngOnInit(): void {
  }

  filtersChanged(){
    
    let newParams: JobParams = {
      company: this.jobsFilters.value.company,
      title: this.jobsFilters.value.title,
      pageNumber: 1,
      pageSize: 5,
      orderBy: this.jobsFilters.value.sortBy
    }

    this.jParamsChange.emit(newParams);
  }

}
