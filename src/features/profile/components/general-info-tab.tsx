import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { Button, Flex, Form, Input } from 'antd';
import { generalInfoFormFields } from '../contants/general-info-form-fields';
import CardCustom from '@/shared/components/card-custom';
import { updateGeneralInfo } from '../api/profile.api';
import type { User } from '../types/user.type';
import { useEffect } from 'react';
import { getMeThunk } from '@/features/auth/store/auth.thunk';
import { useNotification } from '@/shared/hooks/use-notification';

const GeneralInfoTab = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { showNotification } = useNotification();

  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    try {
      const res = await updateGeneralInfo(values);

      if (!res.success) {
        showNotification(
          'error',
          'Cập nhật thất bại',
          res.message || 'Đã có lỗi xảy ra khi cập nhật thông tin cá nhân',
        );
        return;
      }

      dispatch(getMeThunk());

      showNotification(
        'success',
        'Cập nhật thành công',
        res.message || 'Thông tin cá nhân đã được cập nhật thành công',
      );
    } catch (error) {
      showNotification(
        'error',
        'Cập nhật thất bại',
        'Đã có lỗi xảy ra khi cập nhật thông tin cá nhân',
      );
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  if (!user) return null;

  return (
    <Flex vertical gap={16}>
      <CardCustom title="Thông tin cá nhân">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {generalInfoFormFields.map((field) => (
            <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
              <Input />
            </Form.Item>
          ))}
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form>
      </CardCustom>
    </Flex>
  );
};

export default GeneralInfoTab;
