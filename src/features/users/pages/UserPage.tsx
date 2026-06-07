import useTable from '@/shared/hooks/useTable';
import PageHeader from '@/shared/components/page/PageHeader';
import { Button } from 'antd';
import ModalFormCustom from '@/shared/components/modal/ModalFormCustom';
import { useFormModal } from '@/shared/hooks/useFormModal';
import { FormModalMode } from '@/shared/types/form-modal-mode-type';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { generalInfoFormFields } from '@/features/users/constants/general-info-form-fields';
import ActionGroup from '@/shared/components/table/ActionGroup';
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';

import type { SectionForm } from '@/shared/components/form/FormCustom';
import type { User } from '../types/user-type';
import { userRoleAdminApi } from '../api/user-api';
import StatusTag from '../components/StatusTag';
import { USER_STATUS } from '../types/user-status-type';
import type { UserFilterParams } from '../types/user-filter-params-type';
import { userFilters } from '../constants/user-filter-table';
import { formatDate } from '@/shared/utils/date';

const UserPage = () => {
    const { getAll, create, update, active, inActive, remove } = userRoleAdminApi;

    const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
        useFormModal<User>();

    const {
        data: users,

        loading,

        pagination,

        filterValues,

        handleFilterChange,

        handleFilterSubmit,

        handleFilterReset,

        handleChangePage,

        handleDelete,

        handleActive,

        handleInActive,

        refetch,
    } = useTable<User, UserFilterParams>({
        fetchApi: getAll,
        removeApi: remove,
        activeApi: active,
        inActiveApi: inActive,
    });

    const sectionsUserForm: SectionForm<User>[] = [
        {
            key: 'general',
            label: 'Thông tin chung',
            fields: generalInfoFormFields,
        },
    ];

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
            title: 'Vai trò',
            dataIndex: 'role',
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },

        {
            title: 'Giới tính',
            dataIndex: 'gender',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },

        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            render: (dateOfBirth: string) => {
                return formatDate(dateOfBirth);
            },
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (createdAt: string) => {
                return formatDate(createdAt);
            },
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
            render: (_: any, record: User) => {
                return (
                    <ActionGroup<User>
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
                                tooltip: 'Tạm ngưng',
                                danger: true,
                                onClick: () => handleInActive(record.id),
                                isPopconfirm: true,
                            },

                            {
                                show: (r) => r.status === USER_STATUS.INACTIVE,
                                icon: <CheckOutlined />,
                                tooltip: 'Kích hoạt',
                                color: '#52c41a',
                                onClick: () => handleActive(record.id),
                                isPopconfirm: true,
                            },

                            {
                                show: (r) => r.status === USER_STATUS.INACTIVE,
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
                title="Quản lý tài khoản"
                subtitle="Danh sách tài khoản"
                extra={
                    <Button type="primary" onClick={openCreate}>
                        + Thêm tài khoản
                    </Button>
                }
            />

            <div className="mb-4">
                <FilterTableCustom
                    dataFilters={userFilters}
                    values={filterValues}
                    onChange={handleFilterChange}
                    onReset={handleFilterReset}
                    onSubmit={handleFilterSubmit}
                />
            </div>

            <TablePaginationCustom<User>
                columns={columns}
                data={users}
                loading={loading}
                pagination={pagination}
                onChangePage={handleChangePage}
            />

            <ModalFormCustom<User>
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
                        : (values) => update(selectedRecord!.id, values)
                }
                sections={sectionsUserForm}
            />
        </div>
    );
};

export default UserPage;
