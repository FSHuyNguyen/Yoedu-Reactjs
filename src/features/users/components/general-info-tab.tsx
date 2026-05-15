import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { Button, Col, Flex, Form } from 'antd';
import { generalInfoFormFields } from '../contants/general-info-form-fields';
import CardCustom from '@/shared/components/card/card-custom';
import type { User } from '../types/user.type';
import { useEffect } from 'react';
import { getMeThunk } from '@/features/auth/store/auth.thunk';
import { useNotification } from '@/shared/hooks/use-notification';
import { userRoleUserApi } from '../api/user.api';
import { FormFieldType } from '@/shared/types/form-field.type';
import RowCustom from '@/shared/components/row/row-custom';
import { formatDateToPicker } from '@/shared/utils/date';
import DatePickerCustom from '@/shared/components/datepicker/datepicker-custom';
import SelectCustom from '@/shared/components/select/select-custom';
import InputCustom from '@/shared/components/input/input-custom';
import InputTextAreaCustom from '@/shared/components/input/input-textarea-custom';

const GeneralInfoTab = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { showNotification } = useNotification();

  const { update } = userRoleUserApi;

  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    try {
      const res = await update(values);

      dispatch(getMeThunk());

      showNotification(
        'success',
        'Cập nhật thành công',
        res.message || 'Thông tin cá nhân đã được cập nhật thành công',
      );
    } catch (error: any) {
      showNotification(
        'error',
        'Cập nhật thất bại',
        error?.response?.data?.message || 'Đã có lỗi xảy ra khi cập nhật thông tin cá nhân',
      );
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        dateOfBirth: user.dateOfBirth ? formatDateToPicker(user.dateOfBirth) : null,
      });
    }
  }, [user, form]);

  if (!user) return null;

  return (
    <Flex vertical gap={16}>
      <CardCustom title="Thông tin cá nhân">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <RowCustom>
            {generalInfoFormFields.map((field) => (
              <Col key={field.name} span={12}>
                <Form.Item label={field.label} name={field.name} rules={field.rules}>
                  {(() => {
                    switch (field.type) {
                      case FormFieldType.Input:
                        return <InputCustom placeholder={field.placeholder} />;
                      case FormFieldType.Select:
                        return (
                          <SelectCustom placeholder={field.placeholder} options={field.options} />
                        );
                      case FormFieldType.DatePicker:
                        return <DatePickerCustom placeholder={field.placeholder} />;
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
    </Flex>
  );
};

export default GeneralInfoTab;
