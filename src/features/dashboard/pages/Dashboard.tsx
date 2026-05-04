import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="primary" onClick={() => navigate('/students')}>
        Go to Students
      </Button>
      <Button onClick={() => navigate('/courses')}>Go to Courses</Button>
    </div>
  );
};

export default Dashboard;
