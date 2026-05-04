import { Tag } from 'antd';
import type { TodayClassesData } from '../types';
import EmptyCustom from '@/shared/components/empty-custom/EmptyCustom';
import CardCustom from '@/shared/components/card-custom';

interface TodayClassesProps {
  data: TodayClassesData[];
}

const TodayClasses: React.FC<TodayClassesProps> = ({ data }) => {
  return (
    <CardCustom title="Lớp học hôm nay">
      <div className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                <p className="text-sm text-gray-400">Giáo viên: {item.teacher}</p>
                <p className="text-sm text-gray-400">Số học viên: {item.totalStudents}</p>
              </div>

              <Tag color="blue" className="self-start">
                {item.time}
              </Tag>
            </div>
          ))
        ) : (
          <EmptyCustom title="Không có lớp học hôm nay" />
        )}
      </div>
    </CardCustom>
  );
};

export default TodayClasses;
