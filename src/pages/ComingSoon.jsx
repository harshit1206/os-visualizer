import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-12 text-center max-w-lg w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary" />
        
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-block p-5 bg-bg-secondary rounded-2xl text-accent-primary mb-6 border border-card-border"
        >
          <Construction className="w-12 h-12" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-text-primary mb-4">{title}</h2>
        <div className="inline-flex px-3 py-1 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-wide mb-6">
          Module in Development
        </div>
        
        <p className="text-text-secondary leading-relaxed">
          We are currently building this module with premium interactive visualizations. 
          It will feature real-time simulations and in-depth performance analysis tools.
        </p>
        
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-2.5 h-2.5 rounded-full bg-accent-secondary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
