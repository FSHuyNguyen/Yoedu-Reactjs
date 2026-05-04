import { Timeline } from 'antd';
import type { RecentActivityData } from '../types';
import EmptyCustom from '@/shared/components/empty-custom';
import { ActivityType } from '../constants';
import { DollarOutlined, UserOutlined, HomeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CardCustom from '@/shared/components/card-custom';

interface RecentActivityProps {
  data: RecentActivityData[];
}

const activityConfig = {
  [ActivityType.STUDENT]: {
    icon: <UserOutlined />,
    color: 'text-green-500',
  },
  [ActivityType.PAYMENT]: {
    icon: <DollarOutlined />,
    color: 'text-blue-500',
  },
  [ActivityType.CLASS]: {
    icon: <HomeOutlined />,
    color: 'text-purple-500',
  },
  [ActivityType.ABSENCE]: {
    icon: <ClockCircleOutlined />,
    color: 'text-red-500',
  },
};

const RecentActivity: React.FC<RecentActivityProps> = ({ data }) => {
  return (
    <CardCustom title="Hoạt động gần đây">
      {data && data.length > 0 ? (
        <Timeline
          items={data.map((item, index) => {
            const config = activityConfig[item.type];
            return {
              key: index,
              icon: <span className={config.color}>{config.icon}</span>,
              content: (
                <>
                  <div className="font-medium">{item.message}</div>
                  <div className="text-sm text-gray-400">{item.time}</div>
                </>
              ),
            };
          })}
        />
      ) : (
        <EmptyCustom title="Không có hoạt động gần đây" />
      )}
    </CardCustom>
  );
};

export default RecentActivity;
