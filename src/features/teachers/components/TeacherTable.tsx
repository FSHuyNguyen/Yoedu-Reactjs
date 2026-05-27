import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import StatusTag from '@/shared/components/status/StatusTag';
import { STATUS } from '@/shared/types/status.type';
import ActionGroup from '@/shared/components/table/ActionGroup';
import CardCustom from '@/shared/components/card/CardCustom';
import type { Teacher } from '../types/teacher-type';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';

interface TeacherTableProps {
  data: Teacher[];

  loading: boolean;

  pagination: {
    total: number;
    page: number;
    limit: number;
  };

  onChangePage: (page: number, limit: number) => void;

  onView: (teacher: Teacher) => void;

  onEdit: (teacher: Teacher) => void;

  onDelete: (teacher: Teacher) => void;

  onChangeStatus: (teacher: Teacher) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
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
      title: 'Mã giáo viên',
      dataIndex: 'teacherCode',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center' as const,
      render: (value: any) => {
        return <StatusTag status={value} />;
      },
    },

    {
      title: 'Tác vụ',
      align: 'center' as const,
      render: (_: any, record: Teacher) => {
        return (
          <ActionGroup<Teacher>
            record={record}
            actions={[
              {
                show: () => true,
                icon: <EyeOutlined />,
                tooltip: 'Chi tiết',
                onClick: onView,
              },
              {
                show: (r) => r.status !== STATUS.DELETED,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: onEdit,
              },

              {
                show: (r) => r.status === STATUS.ACTIVE,
                icon: <CloseOutlined />,
                tooltip: 'Ngưng hoạt động',
                danger: true,
                onClick: onChangeStatus,
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === STATUS.INACTIVE,
                icon: <CheckOutlined />,
                tooltip: 'Kích hoạt',
                color: '#52c41a',
                onClick: onChangeStatus,
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === STATUS.INACTIVE,
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
      <TablePaginationCustom<Teacher>
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onChangePage={onChangePage}
      />
    </CardCustom>
  );
};

export default TeacherTable;
