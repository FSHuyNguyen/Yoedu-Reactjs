export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string | null;
  courseId: string;
  courseName: string;

  originalPrice: number;
  paidAmount: number;
  status: EnrollmentStatusType;
  statusText?: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export const EnrollmentStatus = {
  STUDYING: 'STUDYING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type EnrollmentStatusType = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];
