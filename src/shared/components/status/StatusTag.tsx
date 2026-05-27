import { Tag } from 'antd';

import { STATUS, type StatusType } from '@/shared/types/status.type';

interface StatusTagProps {
  status?: StatusType;
  statusText?: string;
}

const StatusTag = ({ status, statusText }: StatusTagProps) => {
  switch (status) {
    case STATUS.ACTIVE:
      return <Tag color="success">{statusText || 'Hoạt động'}</Tag>;

    case STATUS.INACTIVE:
      return <Tag color="error">{statusText || 'Ngưng hoạt động'}</Tag>;

    case STATUS.DELETED:
      return <Tag>{statusText || 'Đã xóa'}</Tag>;

    default:
      return <Tag>{statusText || 'Không xác định'}</Tag>;
  }
};

export default StatusTag;
