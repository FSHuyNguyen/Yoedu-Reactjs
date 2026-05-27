import StatCard from '@/features/dashboard/components/stat-card';
import { useEffect, useState } from 'react';
import { getDashboardData } from '../services';
import type { Dashboard } from '@/features/dashboard/types/dashboard-type';
import RecentActivity from '@/features/dashboard/components/recent-activity';
import TodayClasses from '@/features/dashboard/components/today-classes';

const DashboardPage = () => {
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData();
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
        <p className="text-gray-500 text-xs">Tổng quan hệ thống quản lý YOEDU</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {data?.statData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            extra={item.extra}
            color={item.color}
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-4">
        <RecentActivity data={data?.recentActivityData || []} />
        <TodayClasses data={data?.todayClasses || []} />
      </div>
    </div>
  );
};

export default DashboardPage;
