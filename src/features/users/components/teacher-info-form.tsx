import { Button, Form } from 'antd';
import type { Teacher } from '../types/user.type';
import CardCustom from '@/shared/components/card-custom';
import { teacherFormFields } from '../contants/teacher-form-fields';
import InputTextAreaCustom from '@/shared/components/input-textarea-custom';

interface Props {
  teacher: Teacher;
}

const TeacherInfoForm = ({ teacher }: Props) => {
  return (
    <CardCustom title="Thông tin giáo viên">
      <Form layout="vertical" initialValues={teacher}>
        {teacherFormFields.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            <InputTextAreaCustom rows={4} />
          </Form.Item>
        ))}

        <Button type="primary">Cập nhật</Button>
      </Form>
    </CardCustom>
  );
};

export default TeacherInfoForm;
