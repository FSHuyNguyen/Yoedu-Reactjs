import type { FormField } from '@/shared/components/modal/ModalFormCustom';
import { FormFieldType } from '@/shared/types/form-field-type';
import type { Payment } from '../types/payment-type';
import { getTuitionInvoiceOptions } from '@/features/tuition-invoice/api/tuition-invoice-api';
import { paymentMethodOptions } from './payment-method-options';

export const paymentFormFields: FormField<Payment>[] = [
  {
    name: 'invoiceId',
    label: 'Hóa đơn',
    type: FormFieldType.SelectFetch,
    fetchOptions: getTuitionInvoiceOptions,
    placeholder: 'Chọn hóa đơn',
    rules: [{ required: true, message: 'Vui lòng chọn hóa đơn' }],
  },
  {
    name: 'paymentMethod',
    label: 'Phương thức thanh toán',
    type: FormFieldType.Select,
    options: paymentMethodOptions,
    placeholder: 'Chọn phương thức thanh toán',
  },
  {
    name: 'paidAmount',
    label: 'Số tiền thanh toán',
    type: FormFieldType.InputNumber,
    props: {
      isCurrency: true,
    },
    placeholder: 'Nhập số tiền thanh toán',
  },
  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
