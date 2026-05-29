import { EnrollmentStatus } from '../types/enrollment-type';

export const enrollmentStatusOptions = [
  { label: 'Đang học', value: EnrollmentStatus.STUDYING },
  { label: 'Hoàn thành', value: EnrollmentStatus.COMPLETED },
  { label: 'Hủy bỏ', value: EnrollmentStatus.CANCELLED },
];
