import { RouterProvider } from 'react-router-dom';
import ThemeProvider from './app/providers/theme/ThemeProvider';
import AntdProvider from './app/providers/antd/AntdProvider';
import { router } from './app/router/routes';

function App() {
  return (
    <ThemeProvider>
      <AntdProvider>
        <RouterProvider router={router} />
      </AntdProvider>
    </ThemeProvider>
  );
}

export default App;
