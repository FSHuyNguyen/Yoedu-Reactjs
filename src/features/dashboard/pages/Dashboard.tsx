import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/students')}>Go to Students</button>
      <button onClick={() => navigate('/courses')}>Go to Courses</button>
    </div>
  );
};

export default Dashboard;
