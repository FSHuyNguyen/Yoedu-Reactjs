import { Avatar, Flex, Space, Tag, Typography } from 'antd';

import CardCustom from '@/shared/components/card/card-custom';
import { useAppSelector } from '@/app/store/hooks';

const { Title, Text } = Typography;

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <CardCustom>
      <Flex align="center" gap={20}>
        <Avatar size={80}>{user.fullName?.charAt(0)}</Avatar>

        <Flex vertical gap={4}>
          <Title level={3} className="mb-0!">
            {user.fullName}
          </Title>

          <Space>
            <Tag color="blue">{user.role}</Tag>

            <Tag color="green">{user.status}</Tag>
          </Space>

          <Text type="secondary">{user.email}</Text>
        </Flex>
      </Flex>
    </CardCustom>
  );
};

export default ProfileHeader;
