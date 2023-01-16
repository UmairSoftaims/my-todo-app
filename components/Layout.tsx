import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <div className="container mx-auto px-4">
        <div className='grid justify-items-center max-h-screen '>
          <div className='border-2 border-gray-400 mt-8 rounded p-4 space-y-8 w-[475px] '>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
