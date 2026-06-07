import StatCard from '@/features/dashboard/components/stat-card';
import { useEffect, useState } from 'react';
import type { Dashboard } from '@/features/dashboard/types/dashboard-type';
import RecentActivity from '@/features/dashboard/components/recent-activity';
import TodayClasses from '@/features/dashboard/components/today-classes';
import { dashboardRoleAdminApi } from '../api/dashboard-api';
import PageHeader from '@/shared/components/page/PageHeader';

const mapColor = ['green', 'blue', 'purple', 'red'];

const DashboardPage = () => {
  const { getDashboard } = dashboardRoleAdminApi;
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboard();
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <PageHeader title="Dashboard" subtitle="Tổng quan hệ thống quản lý YOEDU" />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {data?.statData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            extra={item.extra}
            color={mapColor[index % mapColor.length]}
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
