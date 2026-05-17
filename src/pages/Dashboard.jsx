import { motion } from 'framer-motion';
import { Cpu, Database, Activity, Clock, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-6 hover:shadow-md transition-all relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-text-secondary text-sm font-semibold mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-text-primary">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-bg-secondary text-accent-primary border border-card-border`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const performanceData = [
  { name: 'FCFS', wait: 24, turnaround: 30 },
  { name: 'SJF', wait: 13, turnaround: 19 },
  { name: 'SRTF', wait: 10, turnaround: 16 },
  { name: 'RR', wait: 17, turnaround: 23 },
];

const activityData = [
  { time: '10:00', load: 45 },
  { time: '10:05', load: 60 },
  { time: '10:10', load: 85 },
  { time: '10:15', load: 40 },
  { time: '10:20', load: 30 },
  { time: '10:25', load: 75 },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">System Dashboard</h1>
          <p className="text-text-secondary mt-1">Overview of algorithm performance and simulation stats.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-white hover:opacity-90 border border-transparent transition-colors shadow-sm font-semibold text-sm">
          <Zap className="w-4 h-4" />
          <span>New Simulation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Algorithms" value="12" icon={Activity} delay={0.1} />
        <StatCard title="Simulations Run" value="1,284" icon={Database} delay={0.2} />
        <StatCard title="Avg. Waiting Time" value="14.2ms" icon={Clock} delay={0.3} />
        <StatCard title="Best Performer" value="SJF" icon={Cpu} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass p-6"
        >
          <h3 className="text-lg font-bold mb-6 text-text-primary">Performance Comparison (Avg)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                  cursor={{fill: 'var(--bg-secondary)'}}
                />
                <Bar dataKey="wait" name="Waiting Time" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="turnaround" name="Turnaround Time" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass p-6"
        >
          <h3 className="text-lg font-bold mb-6 text-text-primary">System Load Activity</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="load" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-surface)', strokeWidth: 2, stroke: 'var(--accent-primary)' }} activeDot={{ r: 6, fill: 'var(--accent-primary)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
