export class JobParams {
  company: string = '';
  title: string = '';
  pageNumber = 1;
  pageSize = 5;
  orderBy = "created";

  constructor(pageSize?: number) {
    if(pageSize) this.pageSize = pageSize;
  }
}