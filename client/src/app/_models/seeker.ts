import { Job } from './job';
import { Photo } from './photo';

export interface Seeker {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  zip: string;
  coverLetter: string;
  lookingFor: string;
  photoUrl: string;
  dateOfBirth: Date;
  knownAs: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
  jobs: Job[];
}

