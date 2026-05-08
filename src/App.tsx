import { Provider } from 'react-redux';
import { store } from './app/store/store';

import ThemeProvider from './app/providers/theme/theme-provider';
import AntdProvider from './app/providers/antd/antd-provider';

import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/routes';

import AppInitializer from './app/AppInitializer';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdProvider>
          <AppInitializer>
            <RouterProvider router={router} />
          </AppInitializer>
        </AntdProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
