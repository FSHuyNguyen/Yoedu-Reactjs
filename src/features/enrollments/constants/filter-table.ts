import { FormFieldType } from '@/shared/types/form-field.type';
import { optionsEnrollmentStatus } from './options-status';

export const enrollmentFilters = [
  {
    name: 'keySearch',
    type: FormFieldType.Input,
    placeholder: 'Tìm kiếm theo tên học sinh, khóa học...',
  },
  {
    name: 'status',
    type: FormFieldType.Select,
    placeholder: 'Trạng thái',
    options: optionsEnrollmentStatus,
  },
];
