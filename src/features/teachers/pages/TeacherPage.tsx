import useTable from '@/shared/hooks/useTable';
import PageHeader from '@/shared/components/page/PageHeader';
import { Button } from 'antd';
import ModalFormCustom, { type SectionForm } from '@/shared/components/modal/ModalFormCustom';
import { useFormModal } from '@/shared/hooks/useFormModal';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import { userRoleAdminApi } from '@/features/users/api/user-api';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { generalInfoFormFields } from '@/features/users/contants/general-info-form-fields';
import { teacherRoleAdminApi } from '../api/teacher-api';
import type { Teacher } from '../types/teacher-type';
import type { TeacherFilterParams } from '../types/teacher-filter-params-type';
import { teacherFormFields } from '../constants/teacher-form.fields';
import { teacherFilters } from '../constants/teacher-filter-table';
import TeacherTable from '../components/TeacherTable';

const TeacherPage = () => {
  const { getAll, create, update } = teacherRoleAdminApi;
  const { changeStatus, remove } = userRoleAdminApi;

  const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
    useFormModal<Teacher>();

  const {
    data: teachers,

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
  } = useTable<Teacher, TeacherFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
    changeStatusApi: changeStatus,
  });

  const sectionsTeacherForm: SectionForm<Teacher>[] = [
    {
      key: 'general',
      label: 'Thông tin chung',
      fields: generalInfoFormFields,
    },
    {
      key: 'teacher',
      label: 'Thông tin giáo viên',
      fields: teacherFormFields,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Quản lý giáo viên"
        subtitle="Danh sách giáo viên"
        extra={
          <Button type="primary" onClick={openCreate}>
            + Thêm giáo viên
          </Button>
        }
      />

      <div className="mb-4">
        <FilterTableCustom
          dataFilters={teacherFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <TeacherTable
        data={teachers}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
        onView={openView}
        onEdit={openEdit}
        onDelete={(teacher) => handleDelete(teacher.userId)}
        onChangeStatus={(teacher) => handleChangeStatus(teacher.userId)}
      />

      <ModalFormCustom<Teacher>
        open={open}
        title="Giáo Viên"
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
        sections={sectionsTeacherForm}
      />
    </div>
  );
};

export default TeacherPage;
