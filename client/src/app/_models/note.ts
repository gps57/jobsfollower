export interface Note {
  id: number;
  jobId: number;
  authorId: number;
  authorPhotoUrl: string;
  content: string;
  created: Date;
}