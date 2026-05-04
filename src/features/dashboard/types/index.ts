import type { ActivityType } from '../constants';

export type StatData = {
  title: string;
  value: string;
  extra: string;
  color: string;
};

export type RecentActivityData = {
  type: (typeof ActivityType)[keyof typeof ActivityType]; // 1 | 2 | 3 | 4
  message: string;
  time: string;
};

export type TodayClassesData = {
  name: string;
  teacher: string;
  totalStudents: number;
  time: string;
};

export type DashboardData = {
  statData: StatData[];
  recentActivityData: RecentActivityData[];
  todayClasses: TodayClassesData[];
};
