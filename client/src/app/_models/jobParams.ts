export class JobParams {
  company: string;
  title: string;
  pageNumber = 1;
  pageSize = 5;

  constructor(pageSize: number) {
    this.pageSize = pageSize;
  }
}