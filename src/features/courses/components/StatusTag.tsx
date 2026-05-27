import { Tag } from 'antd';
import { CourseStatus, type CourseStatusType } from '../types/course-type';

interface StatusCourseTagProps {
  status?: CourseStatusType;
}

const StatusCourseTag = ({ status }: StatusCourseTagProps) => {
  switch (status) {
    case CourseStatus.DRAFT:
      return <Tag>Bản nháp</Tag>;

    case CourseStatus.OPEN:
      return <Tag color="success">Đang mở</Tag>;

    case CourseStatus.CLOSED:
      return <Tag color="warning">Đã đóng</Tag>;

    case CourseStatus.DELETED:
      return <Tag color="error">Đã xóa</Tag>;

    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default StatusCourseTag;
