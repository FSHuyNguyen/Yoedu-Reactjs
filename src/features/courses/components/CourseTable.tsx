import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import ActionGroup from '@/shared/components/table/ActionGroup';
import CardCustom from '@/shared/components/card/CardCustom';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';
import { CourseStatus, type Course } from '../types/course-type';
import { formatDate } from '@/shared/utils/date';
import { formatCurrency } from '@/shared/utils/currecy';
import StatusCourseTag from './StatusTag';

interface CourseTableProps {
  data: Course[];

  loading: boolean;

  pagination: {
    total: number;
    page: number;
    limit: number;
  };

  onChangePage: (page: number, limit: number) => void;

  onView: (course: Course) => void;

  onEdit: (course: Course) => void;

  onDelete: (course: Course) => void;

  onChangeStatus: (course: Course) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  data,
  loading,
  pagination,
  onChangePage,
  onView,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const columns = [
    {
      title: 'Mã khóa học',
      dataIndex: 'courseCode',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacherfullName',
    },
    {
      title: 'Giá khóa học',
      dataIndex: 'price',
      render: (value: any) => (value ? formatCurrency(value) : ''),
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
    },
    {
      title: 'Tổng số buổi học',
      dataIndex: 'totalSessions',
      align: 'center' as const,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      render: (value: any) => (value ? formatDate(value) : ''),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (value: any) => (value ? formatDate(value) : ''),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center' as const,
      render: (value: any) => {
        return <StatusCourseTag status={value} />;
      },
    },
    {
      title: 'Tác vụ',
      align: 'center' as const,
      render: (_: any, record: Course) => {
        return (
          <ActionGroup<Course>
            record={record}
            actions={[
              {
                show: () => true,
                icon: <EyeOutlined />,
                tooltip: 'Chi tiết',
                onClick: onView,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: onEdit,
              },
              {
                show: (r) => r.status === CourseStatus.OPEN,
                icon: <CloseOutlined />,
                tooltip: 'Đóng khóa học',
                danger: true,
                onClick: onChangeStatus,
                isPopconfirm: true,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT,
                icon: <CheckOutlined />,
                tooltip: 'Mở khóa học',
                color: '#52c41a',
                onClick: onChangeStatus,
                isPopconfirm: true,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT,
                icon: <DeleteOutlined />,
                tooltip: 'Xóa',
                danger: true,
                onClick: onDelete,
                isPopconfirm: true,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <CardCustom className="flex-1">
      <TablePaginationCustom<Course>
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onChangePage={onChangePage}
      />
    </CardCustom>
  );
};

export default CourseTable;
