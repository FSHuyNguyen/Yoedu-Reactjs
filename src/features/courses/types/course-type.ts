import type { Teacher } from '@/features/teachers/types/teacher-type';

export interface Course {
  id: string;
  courseCode: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  level: CourseLevelType;
  price: number;
  totalSessions: number;
  maxStudents: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: CourseStatusType;
  statusText: string;
  teacherId: string | null;
  teacher: Teacher | null;
  createdAt: string;
  updatedAt: string;
}

export const CourseStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  DELETED: 'DELETED',
} as const;

export type CourseStatusType = (typeof CourseStatus)[keyof typeof CourseStatus];

export const CourseLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
} as const;

export type CourseLevelType = (typeof CourseLevel)[keyof typeof CourseLevel];
