import { FormFieldType } from '@/shared/types/form-field.type';
import { rules } from '@/shared/utils/rules';
import { studentGradeOptions } from './student-grade-options';
import type { Student } from '../types/student-type';
import type { FormContext, FormField } from '@/shared/components/modal/ModalFormCustom';
import { UserRole } from '@/features/users/types/user-role-type';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';

export const studentFormFields: FormField<Student>[] = [
  {
    name: 'studentCode',
    label: 'Mã sinh viên',
    type: FormFieldType.Input,
    placeholder: 'Mã sinh viên',
    disabled: ({ role, mode }: FormContext) =>
      role !== UserRole.ADMIN || (mode && mode === FormModalMode.CREATE),
  },

  // ===== Parent Info =====
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

  // ===== School Info =====
  {
    name: 'schoolName',
    label: 'Trường học',
    type: FormFieldType.Input,
    placeholder: 'Nhập tên trường học',
  },
  {
    name: 'grade',
    label: 'Lớp',
    type: FormFieldType.Select,
    options: studentGradeOptions,
    placeholder: 'Vui lòng chọn lớp',
  },

  // ===== Academic =====
  {
    name: 'entryAcademicLevel',
    label: 'Học lực đầu vào',
    type: FormFieldType.Input,
    placeholder: 'Nhập học lực đầu vào',
  },
  {
    name: 'latestTestScore',
    label: 'Điểm test gần nhất',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập điểm test gần nhất',
    disabled: ({ role }: FormContext) => role !== UserRole.ADMIN,
  },

  // ===== Joined Date =====
  {
    name: 'joinedAt',
    label: 'Ngày tham gia',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày tham gia',
    disabled: ({ role }: FormContext) => role !== UserRole.ADMIN,
  },

  // ===== Learning =====
  {
    name: 'learningGoal',
    label: 'Mục tiêu học tập',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập mục tiêu học tập',
  },

  // ===== Internal =====
  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
