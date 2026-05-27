import { CourseStatus } from '../types/course-type';

export const optionsCourseStatus = [
  { label: 'Bản nháp', value: CourseStatus.DRAFT },
  { label: 'Đang mở', value: CourseStatus.OPEN },
  { label: 'Đã đóng', value: CourseStatus.CLOSED },
  { label: 'Đã xóa', value: CourseStatus.DELETED },
];
