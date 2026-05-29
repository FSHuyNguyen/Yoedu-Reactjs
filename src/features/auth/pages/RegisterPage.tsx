import { Button, Form, Image } from 'antd';

import { Link, useNavigate } from 'react-router-dom';

import YoeduLogo from '@/assets/images/yoedu-logo.svg';

import CardCustom from '@/shared/components/card/CardCustom';

import { FormFieldType } from '@/shared/types/form-field-type';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { registerThunk } from '@/features/auth/store/auth-thunk';
import { registerFormFields } from '@/features/auth/constants/register-form-fields';
import { useNotification } from '@/shared/hooks/useNotification';
import InputCustom from '@/shared/components/input/InputCustom';
import InputPasswordCustom from '@/shared/components/input/InputPasswordCustom';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const [form] = Form.useForm<RegisterFormValues>();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      await dispatch(
        registerThunk({
          email: values.email,
          password: values.password,
        }),
      ).unwrap();

      showNotification(
        'success',
        'Đăng ký thành công',
        'Bạn đã đăng ký tài khoản thành công. Vui lòng đăng nhập để tiếp tục.',
      );

      navigate('/auth/login', { replace: true });
    } catch (error: any) {
      showNotification('error', 'Đăng ký thất bại', error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <CardCustom className="w-full max-w-md border-0 shadow-2xl">
      {/* LOGO */}
      <div className="mx-auto flex h-24 w-24 items-center justify-center">
        <Image src={YoeduLogo} preview={false} />
      </div>

      {/* HEADER */}
      <div className="mb-2 text-center">
        <h1 className="mb-2 font-bold text-2xl">Đăng ký</h1>

        <span className="text-gray-500">Tạo tài khoản để bắt đầu sử dụng hệ thống</span>
      </div>

      {/* FORM */}
      <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
        {registerFormFields.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
            {(() => {
              switch (field.type) {
                case FormFieldType.InputPassword:
                  return (
                    <InputPasswordCustom placeholder={field.placeholder} prefix={<field.icon />} />
                  );
                case FormFieldType.Input:
                default:
                  return <InputCustom placeholder={field.placeholder} prefix={<field.icon />} />;
              }
            })()}
          </Form.Item>
        ))}

        {/* SUBMIT */}
        <Form.Item className="mb-4!">
          <Button loading={loading} htmlType="submit" type="primary" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      {/* LOGIN */}
      <div className="text-center">
        <span className="text-gray-500">Đã có tài khoản? </span>

        <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
          Đăng nhập
        </Link>
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-center">
        <span className="text-xs text-gray-400">© 2026 YOEDU. Hệ thống quản lý đào tạo.</span>
      </div>
    </CardCustom>
  );
};

export default RegisterPage;
