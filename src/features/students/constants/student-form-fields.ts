import { FormFieldType } from '@/shared/types/form-field.type';
import { rules } from '@/shared/utils/rules';

export const studentFormFields = [
  {
    name: 'fullName',
    label: 'Họ và tên',
    type: FormFieldType.Input,
    placeholder: 'Nhập họ và tên',
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập họ và tên',
      },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: FormFieldType.Input,
    placeholder: 'Nhập email',
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập email',
      },
      rules.email,
    ],
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: FormFieldType.InputPassword,
    placeholder: 'Nhập mật khẩu',
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập mật khẩu',
      },
      rules.password,
    ],
  },
  {
    name: 'phone',
    label: 'Số điện thoại',
    type: FormFieldType.Input,
    placeholder: 'Nhập số điện thoại',
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập số điện thoại',
      },
      rules.phone,
    ],
  },
  {
    name: 'address',
    label: 'Địa chỉ',
    type: FormFieldType.Input,
    placeholder: 'Nhập địa chỉ',
  },
  {
    name: 'entryAcademicLevel',
    label: 'Học lực đầu vào',
    type: FormFieldType.Input,
    placeholder: 'Nhập học lực đầu vào',
  },
  {
    name: 'latestTestScore',
    label: 'Điểm test gần nhất',
    type: FormFieldType.Input,
    placeholder: '',
    disabled: true,
  },
];
