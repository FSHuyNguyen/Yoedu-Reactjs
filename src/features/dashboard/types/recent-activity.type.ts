import { ActivityType } from '@/features/dashboard/constants/activity';

export type RecentActivityItem = {
  type: (typeof ActivityType)[keyof typeof ActivityType]; // 1 | 2 | 3 | 4
  message: string;
  time: string;
};
