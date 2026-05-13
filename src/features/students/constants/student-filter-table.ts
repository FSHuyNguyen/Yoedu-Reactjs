import { optionsStatus } from '@/shared/constants/options-status';
import { FormFieldType } from '@/shared/types/form-field.type';

export const studentFilters = [
  {
    name: 'keySearch',
    type: FormFieldType.Input,
    placeholder: 'Tìm kiếm theo email, tên...',
  },
  {
    name: 'status',
    type: FormFieldType.Select,
    placeholder: 'Trạng thái',
    options: optionsStatus,
  },
];
