import type { FormContext, FormField } from '@/shared/components/modal/ModalFormCustom';
import { FormFieldType } from '@/shared/types/form-field-type';
import { getStudentOptions } from '@/features/students/api/student-api';
import { USER_ROLE } from '@/features/users/types/user-role-type';
import type { TuitionInvoice } from '../types/tuition-invoice-type';
import { getCourseClassOptions } from '@/features/course-class/api/course-class-api';
import { FormModalMode } from '@/shared/types/form-modal-mode-type';
import { getPromotionsOptions } from '@/features/promotion/api/promotion-api';

export const tuitionInvoiceFormFields: FormField<TuitionInvoice>[] = [
  {
    name: 'studentId',
    label: 'Học viên',
    type: FormFieldType.SelectFetch,
    fetchOptions: getStudentOptions,
    placeholder: 'Chọn học viên',
    rules: [{ required: true, message: 'Vui lòng chọn học viên' }],
    disabled: ({ role, mode }: FormContext) =>
      role !== USER_ROLE.ADMIN || mode === FormModalMode.EDIT,
  },
  {
    name: 'courseClassId',
    label: 'Lớp học',
    type: FormFieldType.SelectFetch,
    fetchOptions: getCourseClassOptions,
    placeholder: 'Chọn lớp học',
    rules: [{ required: true, message: 'Vui lòng chọn lớp học' }],
    disabled: ({ mode }: FormContext) => mode === FormModalMode.EDIT,
  },
  {
    name: 'promotionId',
    label: 'Khuyến mãi',
    type: FormFieldType.SelectFetch,
    fetchOptions: getPromotionsOptions,
    placeholder: 'Chọn khuyến mãi',
    disabled: ({ mode }: FormContext) => mode === FormModalMode.EDIT,
  },
  {
    name: 'dueDate',
    label: 'Hạn thanh toán',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn hạn thanh toán',
  },
  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
