import EmptyCustom from '@/shared/components/empty-custom';
import StudentInfoForm from './student-info-form';
import TeacherInfoForm from './teacher-info-form';
import { useAppSelector } from '@/app/store/hooks';

const RoleInfoTab = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  switch (user?.role) {
    case 'STUDENT':
      return <StudentInfoForm student={user.student} />;

    case 'TEACHER':
      return <TeacherInfoForm teacher={user.teacher} />;

    default:
      return <EmptyCustom title="Không có thông tin bổ sung" />;
  }
};

export default RoleInfoTab;
