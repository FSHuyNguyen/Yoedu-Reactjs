import { Tag } from 'antd';

import { STATUS, type Status } from '@/shared/types/status.type';

interface StatusTagProps {
  status?: Status;
}

const StatusTag = ({ status }: StatusTagProps) => {
  switch (status) {
    case STATUS.ACTIVE:
      return <Tag color="success">Hoạt động</Tag>;

    case STATUS.INACTIVE:
      return <Tag color="warning">Ngưng hoạt động</Tag>;

    case STATUS.DELETED:
      return <Tag color="error">Đã xóa</Tag>;

    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default StatusTag;
