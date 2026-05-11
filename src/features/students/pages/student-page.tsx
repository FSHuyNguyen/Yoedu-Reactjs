import useTablePage from '@/shared/hooks/use-table';
import type { Student } from '../types/student.type';
import PageHeader from '@/shared/components/page-header';
import { Button } from 'antd';
import SearchInput from '@/shared/components/search-input';
import StudentTable from '../components/student-table';
import { useNotification } from '@/shared/hooks/use-notification';
import { studentFormFields } from '../constants/student-form-fields';
import FormModalCustom from '@/shared/components/form-modal-custom';
import { studentRoleAdminApi } from '../api/student.api';
import { useFormModal } from '@/shared/hooks/use-form-modal';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import { userRoleAdminApi } from '@/features/users/api/user.api';

const StudentPage = () => {
  const { showNotification } = useNotification();
  const { getAll, create, update } = studentRoleAdminApi;
  const { changeStatus, remove } = userRoleAdminApi;

  const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
    useFormModal<Student>();

  const {
    data: students,

    loading,

    pagination,

    handleSearch,

    handleChangePage,

    refetch,
  } = useTablePage<Student>({
    fetchApi: getAll,
  });

  const handleDeleteStudent = async (student: Student) => {
    try {
      const res = await remove(student.userId);

      showNotification(
        'success',
        'Xóa học viên thành công',
        res.message || 'Học viên đã được xóa thành công',
      );

      refetch();
    } catch (error: any) {
      console.log(error);
      showNotification(
        'error',
        'Xóa học viên thất bại',
        error?.response?.data?.message || 'Đã có lỗi xảy ra khi xóa học viên',
      );
    }
  };

  const handleChangeStatus = async (student: Student) => {
    try {
      const res = await changeStatus(student.userId);

      showNotification(
        'success',
        'Cập nhật trạng thái',
        res.message || 'Trạng thái học viên đã được cập nhật thành công',
      );

      refetch();
    } catch (error: any) {
      showNotification(
        'error',
        'Cập nhật trạng thái',
        error?.response?.data?.message || 'Đã có lỗi xảy ra khi cập nhật trạng thái học viên',
      );
    }
  };

  return (
    <div>
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
        <SearchInput onSearch={handleSearch} />
      </div>

      <StudentTable
        data={students}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
        onView={openView}
        onEdit={openEdit}
        onDelete={handleDeleteStudent}
        onChangeStatus={handleChangeStatus}
      />

      <FormModalCustom<Student>
        open={open}
        title={
          mode === FormModalMode.CREATE
            ? 'Thêm học viên'
            : mode === FormModalMode.EDIT
              ? 'Cập nhật học viên'
              : 'Thông tin học viên'
        }
        initialValues={selectedRecord}
        disabled={mode === FormModalMode.VIEW}
        onCancel={close}
        onSuccess={refetch}
        onSubmit={
          mode === FormModalMode.CREATE ? create : (values) => update(selectedRecord!.id, values)
        }
        fields={studentFormFields}
      />
    </div>
  );
};

export default StudentPage;
