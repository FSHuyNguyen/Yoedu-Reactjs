import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { Button, Col, Flex, Form } from 'antd';
import { generalInfoFormFields } from '../constants/general-info-form-fields';
import CardCustom from '@/shared/components/card/CardCustom';
import type { User } from '../types/user-type';
import { useEffect } from 'react';
import { getMeThunk } from '@/features/auth/store/auth-thunk';
import { useNotification } from '@/shared/hooks/useNotification';
import { userRoleUserApi } from '../api/user-api';
import { FormFieldType } from '@/shared/types/form-field-type';
import RowCustom from '@/shared/components/row/RowCustom';
import { formatDateToPicker } from '@/shared/utils/date';
import DatePickerCustom from '@/shared/components/datepicker/DatePickerCustom';
import SelectCustom from '@/shared/components/select/SelectCustom';
import InputCustom from '@/shared/components/input/InputCustom';
import InputTextAreaCustom from '@/shared/components/input/InputTextAreaCustom';
import InputPasswordCustom from '@/shared/components/input/InputPasswordCustom';
import UploadImageCustom from '@/shared/components/upload/UploadImageCustom';

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
            {generalInfoFormFields
              .filter((field) => field.name !== 'password')
              .map((field) => (
                <Col key={field.name} span={field.col || 12}>
                  <Form.Item label={field.label} name={field.name} rules={field.rules}>
                    {(() => {
                      switch (field.type) {
                        case FormFieldType.Input:
                          return <InputCustom placeholder={field.placeholder} />;
                        case FormFieldType.InputPassword:
                          return <InputPasswordCustom placeholder={field.placeholder} />;
                        case FormFieldType.ImageUpload:
                          return (
                            <UploadImageCustom
                              value={form.getFieldValue(field.name)}
                              onChange={(value) => form.setFieldsValue({ [field.name]: value })}
                            />
                          );
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
