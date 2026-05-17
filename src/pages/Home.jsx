import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Cpu, Database, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
  >
    <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-card-border flex items-center justify-center mb-6 group-hover:bg-accent-primary/10 transition-colors">
      <Icon className="text-accent-primary w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-text-primary">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-bg-main transition-colors duration-300">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-card-border text-text-primary text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <Zap className="w-4 h-4 text-accent-primary" />
          <span>Interactive OS Simulator</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary"
        >
          Master OS Algorithms
          <br />
          <span className="text-accent-primary">
            Visually & Interactively
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-text-secondary mb-12"
        >
          A premium educational platform designed to help you understand complex Operating System concepts through real-time simulations and clean visualizations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-xl bg-accent-primary text-white font-bold text-lg hover:opacity-90 shadow-lg shadow-accent-primary/20 transition-all hover:-translate-y-0.5"
          >
            Start Simulation
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 rounded-xl glass hover:bg-bg-secondary text-text-primary font-bold text-lg transition-all hover:-translate-y-0.5 border border-card-border"
          >
            Explore Features
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full">
          <FeatureCard
            icon={Activity}
            title="Real-Time Visuals"
            description="Watch algorithms execute step-by-step with clean, professional animations."
            delay={0.8}
          />
          <FeatureCard
            icon={BarChart2}
            title="Algorithm Compare"
            description="Compare different scheduling algorithms side-by-side easily."
            delay={0.9}
          />
          <FeatureCard
            icon={Cpu}
            title="CPU Scheduling"
            description="Interactive Gantt charts for FCFS, SJF, Round Robin, and Priority."
            delay={1.0}
          />
          <FeatureCard
            icon={Database}
            title="Disk Scheduling"
            description="Visualize disk head movements for SSTF, SCAN, C-SCAN, LOOK."
            delay={1.1}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
