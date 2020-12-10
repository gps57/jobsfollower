
export interface Job {
  id: number;
  url: string;
  title: string;
  description: string;
  company: string;
  created: Date;
  notes: string;
  isActive: boolean;
}

// TODO:  Need to add these properties here and to the api entity
// - isExpired: boolean;
// - applied: Date;  this one can be null
// - recruiterId: number; // this is the user in the recruiter role that is assigned to this job
// - assignedTo: number; // the ide of the user that is assigned to pursue this job
