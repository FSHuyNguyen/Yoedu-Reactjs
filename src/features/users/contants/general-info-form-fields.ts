import { FormFieldType } from '@/shared/types/form-field.type';
import { rules } from '@/shared/utils/rules';

export const generalInfoFormFields = [
  {
    name: 'email',
    label: 'Email',
    type: FormFieldType.Input,
    placeholder: 'Nhập email',
    rules: [rules.email],
  },
  {
    name: 'fullName',
    label: 'Họ và tên',
    type: FormFieldType.Input,
    placeholder: 'Nhập họ và tên',
  },
  {
    name: 'phone',
    label: 'Số điện thoại',
    type: FormFieldType.Input,
    placeholder: 'Nhập số điện thoại',
    rules: [rules.phone],
  },
];
