import { FormFieldType } from '@/shared/types/form-field.type';
import type { FormContext, FormField } from '@/shared/components/modal/modal-form-custom';
import { UserRole } from '@/features/users/types/user-role.type';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import type { Teacher } from '../types/teacher.type';

export const teacherFormFields: FormField<Teacher>[] = [
  {
    name: 'teacherCode',
    label: 'Mã giáo viên',
    type: FormFieldType.Input,
    placeholder: 'Mã giáo viên',
    disabled: ({ role, mode }: FormContext) =>
      role !== UserRole.ADMIN || mode === FormModalMode.CREATE,
  },
  {
    name: 'bio',
    label: 'Tiểu sử',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập tiểu sử',
  },
  {
    name: 'specialization',
    label: 'Chuyên môn',
    type: FormFieldType.Input,
    placeholder: 'Nhập chuyên môn',
  },
  {
    name: 'qualification',
    label: 'Trình độ',
    type: FormFieldType.Input,
    placeholder: 'Nhập trình độ',
  },
  {
    name: 'yearsOfExperience',
    label: 'Số năm kinh nghiệm',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập số năm kinh nghiệm',
  },
  {
    name: 'joinedAt',
    label: 'Ngày tham gia',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày tham gia',
  },
  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
