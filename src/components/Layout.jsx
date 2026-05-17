import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen text-text-primary bg-bg-main transition-colors duration-300">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
        {!isHome && <Sidebar />}
        <main className={`flex-1 overflow-y-auto ${!isHome ? 'p-4 md:p-6 lg:p-8' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
