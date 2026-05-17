import { motion } from 'framer-motion';
import { Code, Layout, Cpu } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-4">About OS Lab Visualizer</h1>
        <p className="text-xl text-text-secondary">An Interactive Operating System Algorithm Simulator</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-bl-[100px]" />
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
            <Cpu className="text-accent-primary" /> Educational Purpose
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Operating System concepts are often abstract and difficult to grasp through standard textbooks. 
            This visualizer bridges the gap by providing real-time, interactive simulations of core OS algorithms. 
            It is designed to help students and developers understand the mechanics of scheduling, memory management, and process synchronization.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-secondary/5 rounded-bl-[100px]" />
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
            <Layout className="text-accent-secondary" /> Core Features
          </h2>
          <ul className="space-y-4 text-text-secondary">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0" /> 
              <span>Interactive CPU & Disk Scheduling</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0" /> 
              <span>Real-time Gantt Chart visualization</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0" /> 
              <span>Animated algorithmic comparisons</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0" /> 
              <span>Fully responsive SaaS UI</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass p-8 md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-status-success/5 rounded-bl-[100px]" />
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
            <Code className="text-status-success" /> Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3 mt-6">
            {['React', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Vite', 'React Icons'].map((tech) => (
              <div key={tech} className="px-4 py-2 rounded-lg bg-bg-secondary border border-card-border text-text-primary font-medium text-sm">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-bg-surface hover:bg-bg-secondary text-text-primary font-semibold transition-colors border border-card-border shadow-sm"
        >
          <FaGithub className="w-5 h-5 text-text-secondary" />
          View Source on GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default About;
