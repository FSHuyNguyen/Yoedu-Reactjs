import { Image, Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, TeamOutlined, SolutionOutlined, UserOutlined, BookOutlined, AuditOutlined, ReadOutlined, WalletOutlined } from '@ant-design/icons';
import YoeduLogo from '@/assets/images/yoedu-logo.svg';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';

const { Sider } = Layout;

interface AppSidebarProps {
  collapsed: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },

    {
      key: 'management',
      label: 'Quản trị',
      icon: <TeamOutlined />,
      children: [
        {
          key: '/accounts',
          icon: <AuditOutlined />,
          label: 'Tài khoản',
        },
        {
          key: '/students',
          icon: <UserOutlined />,
          label: 'Học viên',
        },
        {
          key: '/parents',
          icon: <TeamOutlined />,
          label: 'Phụ huynh',
        },
        {
          key: '/teachers',
          icon: <SolutionOutlined />,
          label: 'Giáo viên',
        },
        {
          key: '/courses',
          icon: <ReadOutlined />,
          label: 'Khóa đào tạo',
        },
      ],
    },

    {
      key: 'academic',
      label: 'Học vụ',
      icon: <BookOutlined />,
      children: [
        {
          key: '/enrollments',
          icon: <SolutionOutlined />,
          label: 'Tuyển sinh',
        },
      ],
    },

    {
      key: 'finance',
      label: 'Thu tiền',
      icon: <WalletOutlined />,
      children: [],
    },
  ];

  return (
    <Sider width={240} collapsed={collapsed}>
      <div
        className={`h-16 flex items-center justify-center border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <Image src={YoeduLogo} preview={false} width={collapsed ? 48 : 64} />
      </div>

      <Menu
        theme={theme}
        mode="inline"
        items={items}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSidebar;
