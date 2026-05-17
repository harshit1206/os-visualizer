import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateFIFO, calculateLRU, calculateOptimal } from '../algorithms/pageReplacement';
import { Play, RefreshCw, Layers } from 'lucide-react';

const PageReplacement = () => {
  const [algo, setAlgo] = useState('LRU');
  const [framesCount, setFramesCount] = useState(3);
  const [referenceStringStr, setReferenceStringStr] = useState('7,0,1,2,0,3,0,4,2,3,0,3,2');
  
  const [simulated, setSimulated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [simulatingStep, setSimulatingStep] = useState(-1);

  useEffect(() => {
    if (simulated && simulatingStep >= 0 && simulatingStep < simulated.steps.length) {
      const timer = setTimeout(() => {
        setSimulatingStep(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (simulated && simulatingStep === simulated.steps.length) {
      setSimulatingStep(-1);
    }
  }, [simulated, simulatingStep]);

  const handleSimulate = () => {
    const refString = referenceStringStr.split(',').map(x => Number(x.trim())).filter(x => !isNaN(x));
    let res = null;
    
    if (algo === 'FIFO') res = calculateFIFO(refString, framesCount);
    else if (algo === 'LRU') res = calculateLRU(refString, framesCount);
    else if (algo === 'Optimal') res = calculateOptimal(refString, framesCount);
    
    if (isRealTime) {
      setSimulatingStep(1);
    } else {
      setSimulatingStep(-1);
    }
    setSimulated({ ...res, refString });
  };

  const currentSteps = simulated ? (simulatingStep >= 0 ? simulated.steps.slice(0, simulatingStep) : simulated.steps) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Page Replacement</h1>
          <p className="text-text-secondary mt-1">Visualize how memory frames are managed during page faults.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Algorithm</label>
                <select
                  value={algo}
                  onChange={(e) => setAlgo(e.target.value)}
                  className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                >
                  <option value="FIFO">First In First Out (FIFO)</option>
                  <option value="LRU">Least Recently Used (LRU)</option>
                  <option value="Optimal">Optimal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Number of Frames</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={framesCount}
                  onChange={(e) => setFramesCount(Number(e.target.value))}
                  className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Reference String (comma separated)</label>
                <textarea
                  rows="3"
                  value={referenceStringStr}
                  onChange={(e) => setReferenceStringStr(e.target.value)}
                  className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none custom-scrollbar"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="realtime"
                  checked={isRealTime}
                  onChange={(e) => setIsRealTime(e.target.checked)}
                  className="w-4 h-4 rounded text-accent-primary focus:ring-accent-primary bg-bg-main border-card-border"
                />
                <label htmlFor="realtime" className="text-sm font-semibold text-text-secondary cursor-pointer">
                  Real-time Simulation (Step-by-step)
                </label>
              </div>

              <button
                onClick={handleSimulate}
                disabled={simulatingStep >= 0}
                className="w-full py-3 rounded-lg bg-accent-primary text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-5 h-5" /> Simulate
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {simulated ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-6 text-center border-t-4" style={{borderTopColor: 'var(--status-error)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Total Page Faults (Misses)</p>
                  <p className="text-4xl font-bold text-status-error mt-2">{simulated.totalFaults}</p>
                </div>
                <div className="glass p-6 text-center border-t-4" style={{borderTopColor: 'var(--status-success)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Total Page Hits</p>
                  <p className="text-4xl font-bold text-status-success mt-2">{simulated.refString.length - simulated.totalFaults}</p>
                </div>
              </div>

              <div className="glass p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-text-primary mb-6">Page Replacement Steps</h3>
                <div className="flex gap-2 min-w-max pb-4">
                  {currentSteps.map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex flex-col items-center gap-2 w-16 flex-shrink-0"
                    >
                      <div className="w-12 h-12 bg-bg-secondary border border-card-border rounded-lg flex items-center justify-center font-bold text-lg text-text-primary mb-2 shadow-sm">
                        {step.page}
                      </div>
                      
                      <div className="w-12 flex flex-col gap-1 bg-bg-surface border border-card-border p-1 rounded-lg">
                        {Array.from({ length: framesCount }).map((_, fIdx) => (
                          <div 
                            key={fIdx} 
                            className={`h-10 flex items-center justify-center font-bold text-sm rounded ${step.frames[fIdx] !== undefined ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30' : 'bg-bg-main border border-card-border text-text-muted'}`}
                          >
                            {step.frames[fIdx] !== undefined ? step.frames[fIdx] : '-'}
                          </div>
                        ))}
                      </div>

                      <div className={`mt-2 text-xs font-bold px-2 py-1 rounded ${step.isHit ? 'bg-status-success/20 text-status-success' : 'bg-status-error/20 text-status-error'}`}>
                        {step.isHit ? 'HIT' : 'MISS'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-card-border bg-bg-surface/50">
              <RefreshCw className="w-16 h-16 text-text-muted mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No Simulation Data</h3>
              <p className="text-text-secondary">Provide a reference string and click simulate to visualize page faults.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageReplacement;
