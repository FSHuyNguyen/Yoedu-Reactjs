import type { FormField } from '@/shared/components/modal/ModalFormCustom';
import type { Enrollment } from '../types/enrollment-type';
import { FormFieldType } from '@/shared/types/form-field.type';
import { getStudentOptions } from '@/features/students/api/student-api';
import { getCourseOptions } from '@/features/courses/api/course-api';

export const enrollmentFormFields: FormField<Enrollment>[] = [
  {
    name: 'studentId',
    label: 'Học viên',
    type: FormFieldType.SelectFetch,
    fetchOptions: getStudentOptions,
    placeholder: 'Chọn học viên',
  },

  {
    name: 'courseId',
    label: 'Khóa học',
    type: FormFieldType.SelectFetch,
    fetchOptions: getCourseOptions,
    placeholder: 'Chọn khóa học',
  },

  {
    name: 'paidAmount',
    label: 'Số tiền đã thanh toán',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập số tiền đã thanh toán',
  },

  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
