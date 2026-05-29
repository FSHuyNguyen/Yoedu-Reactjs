import useTable from '@/shared/hooks/useTable';
import PageHeader from '@/shared/components/page/PageHeader';
import { Button } from 'antd';
import ModalFormCustom, { type SectionForm } from '@/shared/components/modal/ModalFormCustom';
import { useFormModal } from '@/shared/hooks/useFormModal';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { courseRoleAdminApi } from '../api/course-api';
import { CourseStatus, type Course } from '../types/course-type';
import type { CourseFilterParams } from '../types/course-filter-params-type';
import { courseFilters } from '../constants/course-filter-table';
import { courseFormFields } from '../constants/course-form-fields';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';
import { formatDate } from '@/shared/utils/date';
import { formatCurrency } from '@/shared/utils/currecy';
import StatusCourseTag from '../components/StatusCourseTag';
import ActionGroup from '@/shared/components/table/ActionGroup';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const CoursePage = () => {
  const { getAll, create, update, changeStatus, remove } = courseRoleAdminApi;

  const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
    useFormModal<Course>();

  const {
    data: courses,

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
  } = useTable<Course, CourseFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
    changeStatusApi: changeStatus,
  });

  const sectionsCourseForm: SectionForm<Course>[] = [
    {
      key: 'course',
      label: 'Thông tin khóa học',
      fields: courseFormFields,
    },
  ];

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
      dataIndex: 'teacherName',
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
      title: 'Số học viên tối đa',
      dataIndex: 'maxStudents',
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
      render: (_: any, record: Course) => {
        return <StatusCourseTag status={record.status} statusText={record.statusText} />;
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
                onClick: openView,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT || r.status === CourseStatus.OPEN,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: openEdit,
              },
              {
                show: (r) => r.status === CourseStatus.OPEN,
                icon: <CloseOutlined />,
                tooltip: 'Đóng khóa học',
                danger: true,
                onClick: () => handleChangeStatus(record.id),
                isPopconfirm: true,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT,
                icon: <CheckOutlined />,
                tooltip: 'Mở khóa học',
                color: '#52c41a',
                onClick: () => handleChangeStatus(record.id),
                isPopconfirm: true,
              },
              {
                show: (r) => r.status === CourseStatus.DRAFT,
                icon: <DeleteOutlined />,
                tooltip: 'Xóa',
                danger: true,
                onClick: () => handleDelete(record.id),
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
        title="Quản lý khóa học"
        subtitle="Danh sách khóa học"
        extra={
          <Button type="primary" onClick={openCreate}>
            + Thêm khóa học
          </Button>
        }
      />

      <div className="mb-4">
        <FilterTableCustom
          dataFilters={courseFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <TablePaginationCustom<Course>
        columns={columns}
        data={courses}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
      />

      <ModalFormCustom<Course>
        open={open}
        title="Khóa học"
        mode={mode}
        initialValues={selectedRecord}
        disabled={mode === FormModalMode.VIEW}
        onCancel={close}
        onSuccess={refetch}
        onSubmit={
          mode === FormModalMode.CREATE ? create : (values) => update(selectedRecord!.id, values)
        }
        sections={sectionsCourseForm}
      />
    </div>
  );
};

export default CoursePage;
