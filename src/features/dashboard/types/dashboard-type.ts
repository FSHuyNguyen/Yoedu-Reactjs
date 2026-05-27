import type { RecentActivity } from '@/features/dashboard/types/recent-activity-type';
import type { Stat } from '@/features/dashboard/types/start-data-type';
import type { TodayClasses } from '@/features/dashboard/types/today-classes-type';

export type Dashboard = {
  statData: Stat[];
  recentActivityData: RecentActivity[];
  todayClasses: TodayClasses[];
};
