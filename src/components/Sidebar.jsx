import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Cpu, Database, MemoryStick, Activity, Layers, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'CPU Scheduling', path: '/cpu-scheduling', icon: Cpu },
    { name: 'Disk Scheduling', path: '/disk-scheduling', icon: Database },
    { name: 'Memory Mgt', path: '/memory-management', icon: MemoryStick },
    { name: 'Deadlock', path: '/deadlock-detection', icon: Activity },
    { name: 'Page Replacement', path: '/page-replacement', icon: Layers },
  ];

  return (
    <div className="w-64 glass rounded-none border-t-0 border-l-0 border-b-0 border-r border-card-border flex-shrink-0 hidden md:block z-10">
      <div className="h-full py-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-accent-primary/10 text-accent-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-accent-primary' : 'group-hover:text-text-primary'}`} />
              <span className="font-medium text-sm">{item.name}</span>
              {item.comingSoon && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-text-muted bg-bg-surface px-2 py-0.5 rounded-md border border-card-border">
                  Soon
                </span>
              )}
            </Link>
          );
        })}

        <div className="mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
