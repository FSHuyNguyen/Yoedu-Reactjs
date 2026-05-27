import { Tag } from 'antd';
import { EnrollmentStatus, type EnrollmentStatusType } from '../types/enrollment-type';

interface StatusEnrollmentTagProps {
  status?: EnrollmentStatusType;
  statusText?: string;
}

const StatusEnrollmentTag = ({ status, statusText }: StatusEnrollmentTagProps) => {
  switch (status) {
    case EnrollmentStatus.STUDYING:
      return <Tag color="blue">{statusText || 'Đang học'}</Tag>;

    case EnrollmentStatus.COMPLETED:
      return <Tag color="success">{statusText || 'Hoàn thành'}</Tag>;

    case EnrollmentStatus.CANCELLED:
      return <Tag color="error">{statusText || 'Đã hủy'}</Tag>;

    default:
      return <Tag>{statusText || 'Không xác định'}</Tag>;
  }
};

export default StatusEnrollmentTag;
