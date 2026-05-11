import { Button, Form, Input } from 'antd';
import ModalCustom from '@/shared/components/modal-custom';
import { useState, useEffect } from 'react';
import { FormFieldType } from '../types/form-field.type';
import { useNotification } from '../hooks/use-notification';

interface FormModalCustomProps<T> {
  open: boolean;
  title: string;

  initialValues?: Partial<T> | null;

  loading?: boolean;

  fields: any[];

  disabled?: boolean;

  onCancel: () => void;

  onSuccess: () => void;

  onSubmit: (values: T) => Promise<void>;
}

const FormModalCustom = <T,>({
  open,
  title,
  initialValues,
  fields,
  onCancel,
  onSuccess,
  onSubmit,
  disabled,
}: FormModalCustomProps<T>) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || {});
    }
  }, [open, initialValues]);

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
    <ModalCustom open={open} title={title} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={field.rules}>
            {(() => {
              switch (field.type) {
                case FormFieldType.Input:
                  return (
                    <Input placeholder={field.placeholder} disabled={field.disabled || disabled} />
                  );
                case FormFieldType.InputPassword:
                  return (
                    <Input.Password
                      placeholder={field.placeholder}
                      disabled={field.disabled || disabled}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </Form.Item>
        ))}

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
