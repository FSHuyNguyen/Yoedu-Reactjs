import useTablePage from '@/shared/hooks/use-table';
import type { Student } from '../types/student.type';
import PageHeader from '@/shared/components/page/page-header';
import { Button } from 'antd';
import StudentTable from '../components/student-table';
import { studentFormFields } from '../constants/student-form-fields';
import ModalFormCustom from '@/shared/components/modal/modal-form-custom';
import { studentRoleAdminApi } from '../api/student.api';
import { useFormModal } from '@/shared/hooks/use-form-modal';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import { userRoleAdminApi } from '@/features/users/api/user.api';
import { studentFilters } from '../constants/student-filter-table';
import type { StudentFilterParams } from '../types/student-filter-params.type';
import FilterTableCustom from '@/shared/components/table/filter-table-custom';

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
  } = useTablePage<Student, StudentFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
    changeStatusApi: changeStatus,
  });

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

      <StudentTable
        data={students}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
        onView={openView}
        onEdit={openEdit}
        onDelete={(student) => handleDelete(student.userId)}
        onChangeStatus={(student) => handleChangeStatus(student.userId)}
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
        fields={studentFormFields}
      />
    </div>
  );
};

export default StudentPage;
