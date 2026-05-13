import { FormFieldType } from '@/shared/types/form-field.type';

import { rules } from '@/shared/utils/rules';
import { optionsGender } from './options-gender';

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

  {
    name: 'avatarUrl',
    label: 'Ảnh đại diện',
    type: FormFieldType.Input,
    placeholder: 'Nhập URL ảnh đại diện',
  },

  {
    name: 'gender',
    label: 'Giới tính',
    type: FormFieldType.Select,
    placeholder: 'Chọn giới tính',
    options: optionsGender,
  },

  {
    name: 'dateOfBirth',
    label: 'Ngày sinh',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày sinh',
  },

  {
    name: 'address',
    label: 'Địa chỉ',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập địa chỉ',
  },
];
