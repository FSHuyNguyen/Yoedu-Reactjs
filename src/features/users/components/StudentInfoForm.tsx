import { useEffect } from 'react';

import { Button, Col, Form } from 'antd';
import CardCustom from '@/shared/components/card/CardCustom';
import { useAppDispatch } from '@/app/redux/hooks';
import { getMeThunk } from '@/features/auth/store/auth-thunk';
import { useNotification } from '@/shared/hooks/useNotification';
import type { Student } from '@/features/students/types/student-type';
import { studentRoleStudentApi } from '@/features/students/api/student-api';
import RowCustom from '@/shared/components/row/RowCustom';
import { FormFieldType } from '@/shared/types/form-field-type';
import DatePickerCustom from '@/shared/components/datepicker/DatePickerCustom';
import { studentFormFields } from '@/features/students/constants/student-form-fields';
import SelectCustom from '@/shared/components/select/SelectCustom';
import InputCustom from '@/shared/components/input/InputCustom';
import InputNumberCustom from '@/shared/components/input/InputNumberCustom';
import InputTextAreaCustom from '@/shared/components/input/InputTextAreaCustom';
import { USER_ROLE } from '../types/user-role-type';

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
                  const isDisabled =
                    typeof field.disabled === 'function'
                      ? field.disabled({ role: USER_ROLE.STUDENT })
                      : field.disabled;

                  switch (field.type) {
                    case FormFieldType.Input:
                      return <InputCustom placeholder={field.placeholder} disabled={isDisabled} />;
                    case FormFieldType.InputNumber:
                      return (
                        <InputNumberCustom placeholder={field.placeholder} disabled={isDisabled} />
                      );
                    case FormFieldType.Select:
                      return (
                        <SelectCustom
                          placeholder={field.placeholder}
                          options={field.options}
                          disabled={isDisabled}
                        />
                      );
                    case FormFieldType.DatePicker:
                      return (
                        <DatePickerCustom placeholder={field.placeholder} disabled={isDisabled} />
                      );
                    case FormFieldType.TextArea:
                      return (
                        <InputTextAreaCustom
                          placeholder={field.placeholder}
                          disabled={isDisabled}
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

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </CardCustom>
  );
};

export default StudentInfoForm;
