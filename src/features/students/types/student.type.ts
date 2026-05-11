import type { User } from '@/features/users/types/user.type';

export interface Student extends User {
  id: string;
  userId: string;
  studentCode: string;
  parentName: string;
  parentPhone: string;
  entryAcademicLevel: string;
  latestTestScore: number;
}
