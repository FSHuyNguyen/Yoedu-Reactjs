import { useEffect } from 'react';

import { Button, Col, Form } from 'antd';
import CardCustom from '@/shared/components/card/card-custom';
import { useAppDispatch } from '@/app/store/hooks';
import { getMeThunk } from '@/features/auth/store/auth.thunk';
import { useNotification } from '@/shared/hooks/use-notification';
import type { Student } from '@/features/students/types/student.type';
import { studentRoleStudentApi } from '@/features/students/api/student.api';
import RowCustom from '@/shared/components/row/row-custom';
import { FormFieldType } from '@/shared/types/form-field.type';
import DatePickerCustom from '@/shared/components/datepicker/datepicker-custom';
import { formatDateToPicker } from '@/shared/utils/date';
import { studentFormFields } from '@/features/students/constants/student-form-fields';
import SelectCustom from '@/shared/components/select/select-custom';
import InputCustom from '@/shared/components/input/input-custom';
import InputNumberCustom from '@/shared/components/input/input-number-custom';
import InputTextAreaCustom from '@/shared/components/input/input-textarea-custom';

interface Props {
  student: Student;
}

const StudentInfoForm = ({ student }: Props) => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  const [form] = Form.useForm();

  const onFinish = async (values: Student) => {
    try {
      const res = await studentRoleStudentApi.update(values);

      if (!res.success) {
        showNotification(
          'error',
          'Cập nhật thất bại',
          res.message || 'Đã có lỗi xảy ra khi cập nhật thông tin học viên',
        );
        return;
      }

      dispatch(getMeThunk());

      showNotification(
        'success',
        'Cập nhật thành công',
        res.message || 'Thông tin học viên đã được cập nhật thành công',
      );
    } catch (error) {
      showNotification(
        'error',
        'Cập nhật thất bại',
        'Đã có lỗi xảy ra khi cập nhật thông tin học viên',
      );
    }
  };

  useEffect(() => {
    if (student) {
      form.setFieldsValue({
        ...student,
        joinedAt: student.joinedAt ? formatDateToPicker(student.joinedAt) : null,
      });
    }
  }, [student, form]);

  return (
    <CardCustom title="Thông tin học viên">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <RowCustom>
          {studentFormFields.map((field) => (
            <Col key={field.name} span={12}>
              <Form.Item label={field.label} name={field.name} rules={field.rules}>
                {(() => {
                  switch (field.type) {
                    case FormFieldType.Input:
                      return (
                        <InputCustom placeholder={field.placeholder} disabled={field.disabled} />
                      );
                    case FormFieldType.InputNumber:
                      return (
                        <InputNumberCustom
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                        />
                      );
                    case FormFieldType.Select:
                      return (
                        <SelectCustom placeholder={field.placeholder} options={field.options} />
                      );
                    case FormFieldType.DatePicker:
                      return (
                        <DatePickerCustom
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                        />
                      );
                    case FormFieldType.TextArea:
                      return <InputTextAreaCustom placeholder={field.placeholder} />;
                    default:
                      return null;
                  }
                })()}
              </Form.Item>
            </Col>
          ))}
        </RowCustom>

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </CardCustom>
  );
};

export default StudentInfoForm;
