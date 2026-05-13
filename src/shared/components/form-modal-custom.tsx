import { Button, Col, Form } from 'antd';
import ModalCustom from '@/shared/components/modal-custom';
import { useState, useEffect } from 'react';
import { FormFieldType, type FormFieldTypeKey } from '../types/form-field.type';
import { useNotification } from '../hooks/use-notification';
import RowCustom from './row-custom';
import InputNumberCustom from './input-number-custom';
import DatePickerCustom from './datepicker-custom';
import { formatDateToPicker } from '../utils/date';
import type { UserRole } from '@/features/users/types/user-role.type';
import { useAppSelector } from '@/app/store/hooks';
import { FormModalMode, type FormModalModeType } from '../types/form-modal-mode.type';
import SelectCustom from './select-custom';
import InputCustom from './input-custom';
import InputPasswordCustom from './input-password-custom';
import InputTextAreaCustom from './input-textarea-custom';

export interface FormContext {
  role: UserRole;
  mode: FormModalModeType;
}

export interface FormField<T> {
  name: keyof T;

  label: string;

  type: FormFieldTypeKey;

  placeholder?: string;

  disabled?: any;

  rules?: any[];

  options?: {
    label: string;
    value: string | number;
  }[];
}

interface FormModalCustomProps<T> {
  open: boolean;

  title: string;

  mode: FormModalModeType;

  initialValues?: Partial<T> | null;

  loading?: boolean;

  fields: FormField<T>[];

  disabled?: boolean;

  onCancel: () => void;

  onSuccess: () => void;

  onSubmit: (values: T) => Promise<void>;
}

const FormModalCustom = <T,>({
  open,
  title,
  mode,
  initialValues,
  fields,
  onCancel,
  onSuccess,
  onSubmit,
  disabled,
}: FormModalCustomProps<T>) => {
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (open && initialValues) {
      const formattedValues: Record<string, any> = {
        ...initialValues,
      };

      fields.forEach((field) => {
        const value = initialValues[field.name];

        if (field.type === FormFieldType.DatePicker && value) {
          formattedValues[field.name as string] = formatDateToPicker(value as string);
        }
      });

      form.setFieldsValue(formattedValues);
    }
  }, [open, initialValues, fields, form]);

  const handleSubmit = async (values: T) => {
    try {
      setLoading(true);

      await onSubmit(values);

      showNotification('success', 'Thành công', 'Dữ liệu đã được lưu thành công');

      form.resetFields();

      onCancel();

      onSuccess();
    } catch (error: any) {
      showNotification(
        'error',
        'Lỗi',
        error?.response?.data?.message || 'Không thể lưu dữ liệu. Vui lòng thử lại',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCustom
      open={open}
      title={
        mode === FormModalMode.CREATE
          ? `Thêm ${title.toLowerCase()}`
          : mode === FormModalMode.EDIT
            ? `Cập nhật ${title.toLowerCase()}`
            : `Thông tin ${title.toLowerCase()}`
      }
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <RowCustom>
          {fields.map((field) => (
            <Col key={field.name as string} span={12}>
              <Form.Item name={field.name as string} label={field.label} rules={field.rules}>
                {(() => {
                  const isDisabled =
                    typeof field.disabled === 'function'
                      ? field.disabled({ role: user?.role as UserRole, mode })
                      : field.disabled;

                  switch (field.type) {
                    case FormFieldType.Input:
                      return (
                        <InputCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled || disabled}
                        />
                      );
                    case FormFieldType.InputNumber:
                      return (
                        <InputNumberCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled || disabled}
                        />
                      );
                    case FormFieldType.InputPassword:
                      return (
                        <InputPasswordCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled || disabled}
                        />
                      );
                    case FormFieldType.Select:
                      return (
                        <SelectCustom
                          placeholder={field.placeholder}
                          options={field.options}
                          disabled={isDisabled || disabled}
                        />
                      );
                    case FormFieldType.DatePicker:
                      return (
                        <DatePickerCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled || disabled}
                        />
                      );
                    case FormFieldType.TextArea:
                      return (
                        <InputTextAreaCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled || disabled}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Form.Item>
            </Col>
          ))}
        </RowCustom>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy</Button>

          <Button type="primary" htmlType="submit" loading={loading} disabled={disabled}>
            Lưu
          </Button>
        </div>
      </Form>
    </ModalCustom>
  );
};

export default FormModalCustom;
