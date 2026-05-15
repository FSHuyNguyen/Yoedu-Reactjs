import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import TableCustom from '@/shared/components/table/table-custom';

import type { Student } from '../types/student.type';
import StatusTag from '@/shared/components/status/status-tag';
import { STATUS } from '@/shared/types/status.type';
import ActionGroup from '@/shared/components/table/action-group';
import CardCustom from '@/shared/components/card/card-custom';

interface StudentTableProps {
  data: Student[];

  loading?: boolean;

  pagination: {
    total: number;
    page: number;
    limit: number;
  };

  onChangePage: (page: number, limit: number) => void;

  onView: (student: Student) => void;

  onEdit: (student: Student) => void;

  onDelete: (student: Student) => void;

  onChangeStatus: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
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
      render: (_: any, record: Student) => {
        return (
          <ActionGroup<Student>
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
      <TableCustom<Student>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,

          showSizeChanger: true,

          onChange: (page, pageSize) => {
            onChangePage(page, pageSize);
          },
        }}
        className="py-2"
      />
    </CardCustom>
  );
};

export default StudentTable;
