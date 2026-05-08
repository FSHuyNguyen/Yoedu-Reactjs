import { Button, Form, Input } from 'antd';
import type { Teacher } from '../types/user.type';
import CardCustom from '@/shared/components/card-custom';
import { teacherFormFields } from '../contants/teacher-form-fields';

interface Props {
  teacher: Teacher | undefined;
}

const TeacherInfoForm = ({ teacher }: Props) => {
  if (!teacher) return null;

  return (
    <CardCustom title="Thông tin giáo viên">
      <Form layout="vertical" initialValues={teacher}>
        {teacherFormFields.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            <Input.TextArea rows={4} />
          </Form.Item>
        ))}

        <Button type="primary">Cập nhật</Button>
      </Form>
    </CardCustom>
  );
};

export default TeacherInfoForm;
