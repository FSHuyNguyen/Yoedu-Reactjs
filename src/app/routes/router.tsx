import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from '@/features/course/pages';
import Dashboard from '@/features/dashboard/pages';
import Student from '@/features/student/pages';

const AppRouter = () => {
  return (
    // BrowserRouter: Bọc toàn bộ app để enable routing (đọc URL trên trình duyệt)
    <BrowserRouter>
      {/* Routes: nơi chứa danh sách các route */}
      <Routes>
        {/* 
          Route: mapping giữa URL và Component
          path="/" → khi vào trang gốc sẽ render Dashboard
        */}
        <Route path="/" element={<Dashboard />} />

        {/* 
          Khi URL là /students → render Student component
          Ví dụ: http://localhost:5173/students
        */}
        <Route path="/students" element={<Student />} />

        {/* 
          Khi URL là /courses → render Course component
        */}
        <Route path="/courses" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
