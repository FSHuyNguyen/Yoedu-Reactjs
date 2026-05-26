import useTablePage from '@/shared/hooks/use-table';
import PageHeader from '@/shared/components/page/page-header';
import { Button } from 'antd';
import ModalFormCustom, { type SectionForm } from '@/shared/components/modal/modal-form-custom';
import { useFormModal } from '@/shared/hooks/use-form-modal';
import { FormModalMode } from '@/shared/types/form-modal-mode.type';
import FilterTableCustom from '@/shared/components/table/filter-table-custom';
import { courseRoleAdminApi } from '../api/course.api';
import type { Course } from '../types/course.type';
import type { CourseFilterParams } from '../types/course-filter-params.type';
import { courseFilters } from '../constants/course-filter-table';
import { courseFormFields } from '../constants/course-form-fields';
import CourseTable from '../components/course-table';

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
  } = useTablePage<Course, CourseFilterParams>({
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

      <CourseTable
        data={courses}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
        onView={openView}
        onEdit={openEdit}
        onDelete={(course) => handleDelete(course.id)}
        onChangeStatus={(course) => handleChangeStatus(course.id)}
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
