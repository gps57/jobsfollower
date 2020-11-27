import { Job } from './job';
import { Photo } from './photo';

export interface Seeker {
  id: number;
  username: string;
  photoUrl: string;
  dateOfBirth: Date;
  knownAs: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
  jobs: Job[];
}

