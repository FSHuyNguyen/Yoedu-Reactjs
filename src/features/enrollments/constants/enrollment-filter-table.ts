import { FormFieldType } from '@/shared/types/form-field.type';
import { enrollmentStatusOptions } from './enrollment-status-options';
import { getCourseOptions } from '@/features/courses/api/course-api';
import { getStudentOptions } from '@/features/students/api/student-api';

export const enrollmentFilters = [
  {
    name: 'keySearch',
    type: FormFieldType.Input,
    placeholder: 'Tìm kiếm theo tên học sinh, khóa học...',
  },
  {
    name: 'studentId',
    type: FormFieldType.SelectFetch,
    fetchOptions: getStudentOptions,
    placeholder: 'Chọn học viên',
  },
  {
    name: 'courseId',
    type: FormFieldType.SelectFetch,
    fetchOptions: getCourseOptions,
    placeholder: 'Chọn khóa học',
  },
  {
    name: 'status',
    type: FormFieldType.Select,
    placeholder: 'Trạng thái',
    options: enrollmentStatusOptions,
  },
];
