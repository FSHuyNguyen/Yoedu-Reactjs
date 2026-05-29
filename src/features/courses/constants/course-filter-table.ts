import { FormFieldType } from '@/shared/types/form-field-type';
import { courseStatusOptions } from './course-status-options';
import { getTeachersOptions } from '@/features/teachers/api/teacher-api';
import { courseLevelOptions } from './course-level-options';

export const courseFilters = [
  {
    name: 'keySearch',
    type: FormFieldType.Input,
    placeholder: 'Tìm kiếm theo tên khóa học...',
  },
  {
    name: 'teacherId',
    type: FormFieldType.SelectFetch,
    fetchOptions: getTeachersOptions,
    placeholder: 'Chọn giáo viên',
  },
  {
    name: 'level',
    type: FormFieldType.Select,
    placeholder: 'Cấp độ',
    options: courseLevelOptions,
  },
  {
    name: 'startDate',
    label: 'Ngày bắt đầu',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày bắt đầu',
  },
  {
    name: 'endDate',
    label: 'Ngày kết thúc',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày kết thúc',
  },
  {
    name: 'status',
    type: FormFieldType.Select,
    placeholder: 'Trạng thái',
    options: courseStatusOptions,
  },
];
