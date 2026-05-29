import useTable from '@/shared/hooks/useTable';
import type { Student } from '../types/student-type';
import PageHeader from '@/shared/components/page/PageHeader';
import { Button } from 'antd';
import { studentFormFields } from '../constants/student-form-fields';
import ModalFormCustom, { type SectionForm } from '@/shared/components/modal/ModalFormCustom';
import { studentRoleAdminApi } from '../api/student-api';
import { useFormModal } from '@/shared/hooks/useFormModal';
import { FormModalMode } from '@/shared/types/form-modal-mode-type';
import { userRoleAdminApi } from '@/features/users/api/user-api';
import { studentFilters } from '../constants/student-filter-table';
import type { StudentFilterParams } from '../types/student-filter-params-type';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { generalInfoFormFields } from '@/features/users/contants/general-info-form-fields';
import ActionGroup from '@/shared/components/table/ActionGroup';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { USER_STATUS } from '@/features/users/types/user-status-type';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';
import StatusTag from '@/shared/components/status/StatusTag';

const StudentPage = () => {
  const { getAll, create, update } = studentRoleAdminApi;
  const { changeStatus, remove } = userRoleAdminApi;

  const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
    useFormModal<Student>();

  const {
    data: students,

    loading,

    pagination,

    filterValues,

    handleFilterChange,

    handleFilterSubmit,

    handleFilterReset,

    handleChangePage,

    handleDelete,

    handleChangeStatus,

    refetch,
  } = useTable<Student, StudentFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
    changeStatusApi: changeStatus,
  });

  const sectionsStudentForm: SectionForm<Student>[] = [
    {
      key: 'general',
      label: 'Thông tin chung',
      fields: generalInfoFormFields,
    },
    {
      key: 'student',
      label: 'Thông tin học viên',
      fields: studentFormFields,
    },
  ];

  const columns = [
    {
      title: 'Mã học sinh',
      dataIndex: 'studentCode',
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
      render: (_: any, record: any) => {
        return <StatusTag status={record.status} statusText={record.statusText} />;
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
                onClick: openView,
              },
              {
                show: (r) => r.status !== USER_STATUS.DELETED,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: openEdit,
              },

              {
                show: (r) => r.status === USER_STATUS.ACTIVE,
                icon: <CloseOutlined />,
                tooltip: 'Ngưng hoạt động',
                danger: true,
                onClick: () => handleChangeStatus(record.userId),
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === USER_STATUS.INACTIVE,
                icon: <CheckOutlined />,
                tooltip: 'Kích hoạt',
                color: '#52c41a',
                onClick: () => handleChangeStatus(record.userId),
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === USER_STATUS.INACTIVE,
                icon: <DeleteOutlined />,
                tooltip: 'Xóa',
                danger: true,
                onClick: () => handleDelete(record.userId),
                isPopconfirm: true,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Quản lý học viên"
        subtitle="Danh sách học viên"
        extra={
          <Button type="primary" onClick={openCreate}>
            + Thêm học viên
          </Button>
        }
      />

      <div className="mb-4">
        <FilterTableCustom
          dataFilters={studentFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <TablePaginationCustom<Student>
        columns={columns}
        data={students}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
      />

      <ModalFormCustom<Student>
        open={open}
        title="Học Viên"
        mode={mode}
        initialValues={selectedRecord}
        disabled={mode === FormModalMode.VIEW}
        onCancel={close}
        onSuccess={refetch}
        onSubmit={
          mode === FormModalMode.CREATE
            ? create
            : (values) => update(selectedRecord!.userId, values)
        }
        sections={sectionsStudentForm}
      />
    </div>
  );
};

export default StudentPage;
