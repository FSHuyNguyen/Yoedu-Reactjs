import EmptyCustom from '@/shared/components/empty-custom';
import StudentInfoForm from './student-info-form';
import TeacherInfoForm from './teacher-info-form';
import { useAppSelector } from '@/app/store/hooks';
import { UserRole } from '../types/user-role.type';

const RoleInfoTab = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  switch (user?.role) {
    case UserRole.STUDENT:
      if (!user.student) return null;
      return <StudentInfoForm student={user.student} />;

    case UserRole.TEACHER:
      if (!user.teacher) return null;
      return <TeacherInfoForm teacher={user.teacher} />;

    default:
      return <EmptyCustom title="Không có thông tin bổ sung" />;
  }
};

export default RoleInfoTab;
