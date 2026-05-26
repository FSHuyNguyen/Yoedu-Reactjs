import { FormFieldType } from '@/shared/types/form-field.type';
import { optionsCourseStatus } from './options-course-status';
import { optionsCourseLevel } from './options-course-level';

export const courseFilters = [
  {
    name: 'keySearch',
    type: FormFieldType.Input,
    placeholder: 'Tìm kiếm theo tên khóa học...',
  },
  {
    name: 'level',
    type: FormFieldType.Select,
    placeholder: 'Cấp độ',
    options: optionsCourseLevel,
  },
  {
    name: 'status',
    type: FormFieldType.Select,
    placeholder: 'Trạng thái',
    options: optionsCourseStatus,
  },
];
