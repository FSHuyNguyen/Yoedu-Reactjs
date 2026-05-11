import { useEffect } from 'react';

import { Button, Form, Input } from 'antd';
import CardCustom from '@/shared/components/card-custom';
import { studentFormFields } from '../contants/student-form-fields';
import { useAppDispatch } from '@/app/store/hooks';
import { getMeThunk } from '@/features/auth/store/auth.thunk';
import { useNotification } from '@/shared/hooks/use-notification';
import type { Student } from '@/features/students/types/student.type';
import { studentRoleStudentApi } from '@/features/students/api/student.api';

interface Props {
  student: Student | undefined;
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
      form.setFieldsValue(student);
    }
  }, [student, form]);

  if (!student) return null;

  return (
    <CardCustom title="Thông tin học viên">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {studentFormFields.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
            <Input placeholder={field.placeholder} disabled={field.disabled} />
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </CardCustom>
  );
};

export default StudentInfoForm;
