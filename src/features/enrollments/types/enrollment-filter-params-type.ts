import type { FilterParams } from '@/shared/types/filter-params-type';

export interface EnrollmentFilterParams extends FilterParams {
  courseId?: string;
  studentId?: string;
}
