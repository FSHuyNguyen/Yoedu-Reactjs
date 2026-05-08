import { FormFieldType } from '@/shared/types/form-field-type';
import { rules } from '@/shared/utils/rules';

export const studentFormFields = [
  {
    name: 'studentCode',
    label: 'Mã sinh viên',
    type: FormFieldType.Input,
    placeholder: '',
    disabled: true,
  },
  {
    name: 'parentName',
    label: 'Tên phụ huynh',
    type: FormFieldType.Input,
    placeholder: 'Nhập tên phụ huynh',
  },
  {
    name: 'parentPhone',
    label: 'Số điện thoại phụ huynh',
    type: FormFieldType.Input,
    placeholder: 'Nhập số điện thoại phụ huynh',
    rules: [rules.phone],
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
