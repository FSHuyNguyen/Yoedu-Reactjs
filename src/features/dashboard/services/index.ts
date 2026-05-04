import { ActivityType } from '../constants';

export const getDashboardData = async () => {
  /* Fake Data */
  return {
    statData: [
      { title: 'Tổng học viên', value: '1,248 người', extra: '+12%', color: 'green' },
      { title: 'Lớp đang hoạt động', value: '42 lớp', extra: '+3 lớp', color: 'blue' },
      { title: 'Giáo viên', value: '68 người', extra: 'Không đổi', color: 'purple' },
      { title: 'Doanh thu', value: '284,000,000', extra: '+8%', color: 'red' },
    ],
    recentActivityData: [
      {
        type: ActivityType.STUDENT,
        message: 'Học viên mới: Nguyễn Văn A đăng ký React',
        time: '10 phút trước',
      },
      {
        type: ActivityType.PAYMENT,
        message: 'Thanh toán: Phụ huynh đóng học phí',
        time: '30 phút trước',
      },
      {
        type: ActivityType.CLASS,
        message: 'Lớp học: React Advanced bắt đầu',
        time: '1 giờ trước',
      },
      {
        type: ActivityType.ABSENCE,
        message: 'Học viên vắng mặt: Nguyễn Văn A',
        time: '2 giờ trước',
      },
    ],
    todayClasses: [
      {
        name: 'React Cơ bản',
        teacher: 'Nguyễn Thị D',
        totalStudents: 30,
        time: '09:00 - 11:00',
      },
      {
        name: 'JavaScript Advanced',
        teacher: 'Trần Văn E',
        totalStudents: 15,
        time: '14:00 - 16:00',
      },
    ],
  };
};
