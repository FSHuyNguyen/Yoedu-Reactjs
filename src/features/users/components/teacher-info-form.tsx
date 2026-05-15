import { useEffect } from 'react';

import { Button, Col, Form } from 'antd';
import CardCustom from '@/shared/components/card/card-custom';
import InputTextAreaCustom from '@/shared/components/input/input-textarea-custom';
import { teacherFormFields } from '@/features/teachers/constants/teacher-form.fields';
import { FormFieldType } from '@/shared/types/form-field.type';
import InputCustom from '@/shared/components/input/input-custom';
import InputNumberCustom from '@/shared/components/input/input-number-custom';
import SelectCustom from '@/shared/components/select/select-custom';
import DatePickerCustom from '@/shared/components/datepicker/datepicker-custom';
import { teacherRoleTeacherApi } from '@/features/teachers/api/teacher.api';
import { getMeThunk } from '@/features/auth/store/auth.thunk';
import { useNotification } from '@/shared/hooks/use-notification';
import { useAppDispatch } from '@/app/store/hooks';
import { formatDateToPicker } from '@/shared/utils/date';
import type { Teacher } from '@/features/teachers/types/teacher.type';
import RowCustom from '@/shared/components/row/row-custom';
import { UserRole } from '../types/user-role.type';

interface Props {
  teacher: Teacher;
}

const TeacherInfoForm = ({ teacher }: Props) => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  const [form] = Form.useForm();

  const onFinish = async (values: Teacher) => {
    try {
      const res = await teacherRoleTeacherApi.update(values);

      if (!res.success) {
        showNotification(
          'error',
          'Cập nhật thất bại',
          res.message || 'Đã có lỗi xảy ra khi cập nhật thông tin giáo viên',
        );
        return;
      }

      dispatch(getMeThunk());

      showNotification(
        'success',
        'Cập nhật thành công',
        res.message || 'Thông tin giáo viên đã được cập nhật thành công',
      );
    } catch (error) {
      showNotification(
        'error',
        'Cập nhật thất bại',
        'Đã có lỗi xảy ra khi cập nhật thông tin giáo viên',
      );
    }
  };

  useEffect(() => {
    if (teacher) {
      form.setFieldsValue({
        ...teacher,
        joinedAt: teacher.joinedAt ? formatDateToPicker(teacher.joinedAt) : null,
      });
    }
  }, [teacher, form]);

  return (
    <CardCustom title="Thông tin giáo viên">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <RowCustom>
          {teacherFormFields.map((field) => (
            <Col key={field.name} span={12}>
              <Form.Item label={field.label} name={field.name} rules={field.rules}>
                {(() => {
                  const isDisabled =
                    typeof field.disabled === 'function'
                      ? field.disabled({ role: UserRole.TEACHER })
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

export default TeacherInfoForm;
