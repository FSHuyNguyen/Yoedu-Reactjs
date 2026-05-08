import { Tabs, Flex } from 'antd';
import ProfileHeader from '../components/profile-header';
import GeneralInfoTab from '../components/general-info-tab';
import RoleInfoTab from '../components/role-info-tab';
import { useAppSelector } from '@/app/store/hooks';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Flex vertical gap={24}>
      <ProfileHeader />

      {user && user.role !== 'ADMIN' && (
        <Tabs
          defaultActiveKey="general"
          items={[
            {
              key: 'general',
              label: 'Thông tin chung',
              children: <GeneralInfoTab />,
            },
            {
              key: 'role',
              label: user.role === 'STUDENT' ? 'Thông tin học viên' : 'Thông tin giáo viên',
              children: <RoleInfoTab />,
            },
          ]}
        />
      )}
    </Flex>
  );
};

export default ProfilePage;
