import { Image, Layout, Menu, type MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  SolutionOutlined,
  UserOutlined,
  BookOutlined,
  AuditOutlined,
  ReadOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import YoeduLogo from '@/assets/images/yoedu-logo.svg';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useAppSelector } from '@/app/redux/hooks';
import { USER_ROLE, type UserRole } from '@/features/users/types/user-role-type';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number] & {
  roles?: UserRole[];
  children?: MenuItem[];
};

interface AppSidebarProps {
  collapsed: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      roles: Object.values(USER_ROLE),
    },
    {
      key: 'management',
      label: 'Quản trị',
      icon: <TeamOutlined />,
      roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
      children: [
        {
          key: '/accounts',
          icon: <AuditOutlined />,
          label: 'Tài khoản',
          roles: [USER_ROLE.ADMIN],
        },
        {
          key: '/students',
          icon: <UserOutlined />,
          label: 'Học viên',
          roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
        },
        {
          key: '/parents',
          icon: <TeamOutlined />,
          label: 'Phụ huynh',
          roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
        },
        {
          key: '/teachers',
          icon: <SolutionOutlined />,
          label: 'Giáo viên',
          roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
        },
        {
          key: '/courses',
          icon: <ReadOutlined />,
          label: 'Khóa đào tạo',
          roles: [
            USER_ROLE.ADMIN,
            USER_ROLE.STAFF,
            USER_ROLE.TEACHER,
            USER_ROLE.STUDENT,
            USER_ROLE.PARENT,
          ],
        },
      ],
    },
    {
      key: 'academic',
      label: 'Học vụ',
      icon: <BookOutlined />,
      roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
      children: [
        {
          key: '/enrollments',
          icon: <SolutionOutlined />,
          label: 'Tuyển sinh',
          roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF],
        },
      ],
    },
    {
      key: 'finance',
      label: 'Thu tiền',
      icon: <WalletOutlined />,
      roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF, USER_ROLE.PARENT],
      children: [],
    },
  ];

  const filterMenuByRole = (items: MenuItem[], role?: UserRole): MenuItem[] => {
    return (
      items
        // Nếu item không có trường roles hoặc trường roles có chứa role của user thì giữ lại
        .filter((item) => !item.roles || item.roles.includes(role!))
        // Với các item có children, tiếp tục lọc children theo cùng logic
        .map((item) => ({
          ...item,
          children: item.children ? filterMenuByRole(item.children, role) : undefined,
        }))
        // Sau khi lọc, loại bỏ các item có children nhưng không còn children nào sau khi lọc
        .filter((item) => {
          const isLeaf = !item.children;
          const hasChildren = item.children?.length;

          return isLeaf || hasChildren;
        }) as MenuItem[]
    );
  };

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
        items={filterMenuByRole(menuItems, user?.role)}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSidebar;
