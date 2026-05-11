import { Tabs, Flex } from 'antd';
import ProfileHeader from '../components/profile-header';
import GeneralInfoTab from '../components/general-info-tab';
import RoleInfoTab from '../components/role-info-tab';
import { useAppSelector } from '@/app/store/hooks';
import { UserRole } from '../types/user-role.type';

const UserProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <Flex vertical gap={24}>
      <ProfileHeader />

      <Tabs
        defaultActiveKey="general"
        items={[
          {
            key: 'general',
            label: 'Thông tin chung',
            children: <GeneralInfoTab />,
          },
          ...(user.role === UserRole.STUDENT || user.role === UserRole.TEACHER
            ? [
                {
                  key: 'role',
                  label:
                    user.role === UserRole.STUDENT ? 'Thông tin học viên' : 'Thông tin giáo viên',
                  children: <RoleInfoTab />,
                },
              ]
            : []),
        ]}
      />
    </Flex>
  );
};

export default UserProfilePage;
