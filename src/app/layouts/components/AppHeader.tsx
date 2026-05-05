import { Layout, Avatar, Dropdown, Badge, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useTheme } from '@/app/providers/theme/useTheme';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, toggleTheme } = useTheme();

  // fake user
  const user = {
    name: 'Nguyễn Văn Huy',
    role: 'Admin',
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  return (
    <Header
      className={`flex justify-between items-center px-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
    >
      {/* LEFT */}
      <div className="text-xl cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <Badge count={5} size="small">
          <BellOutlined className="text-lg cursor-pointer" />
        </Badge>

        {/* Theme switch */}
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
        />

        {/* User dropdown */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar icon={<UserOutlined />} />

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-400">{user.role}</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
