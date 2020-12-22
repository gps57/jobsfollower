import { Job } from './job';
import { Photo } from './photo';

export interface Seeker {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  city: string;
  state: string;
  zip: string;
  coverletter: string;
  lookingfor: string;
  photoUrl: string;
  dateOfBirth: Date;
  knownAs: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
  jobs: Job[];
}

