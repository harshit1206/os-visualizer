import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateFirstFit, calculateBestFit, calculateWorstFit } from '../algorithms/memory';
import { Play, Plus, Trash2, RefreshCw } from 'lucide-react';

const MemoryManagement = () => {
  const [algo, setAlgo] = useState('First Fit');
  const [blocks, setBlocks] = useState([100, 500, 200, 300, 600]);
  const [processes, setProcesses] = useState([
    { id: 1, size: 212 },
    { id: 2, size: 417 },
    { id: 3, size: 112 },
    { id: 4, size: 426 },
  ]);
  const [newBlockSize, setNewBlockSize] = useState('');
  const [newProcessSize, setNewProcessSize] = useState('');

  const [simulated, setSimulated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [simulatingStep, setSimulatingStep] = useState(-1);

  useEffect(() => {
    if (simulated && simulatingStep >= 0 && simulatingStep < simulated.processes.length) {
      const timer = setTimeout(() => {
        setSimulatingStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (simulated && simulatingStep === simulated.processes.length) {
      setSimulatingStep(-1);
    }
  }, [simulated, simulatingStep]);

  const addBlock = () => {
    if (newBlockSize && !isNaN(newBlockSize)) {
      setBlocks([...blocks, Number(newBlockSize)]);
      setNewBlockSize('');
    }
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const addProcess = () => {
    if (newProcessSize && !isNaN(newProcessSize)) {
      const nextId = processes.length ? Math.max(...processes.map(p => p.id)) + 1 : 1;
      setProcesses([...processes, { id: nextId, size: Number(newProcessSize) }]);
      setNewProcessSize('');
    }
  };

  const removeProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const handleSimulate = () => {
    let res = null;
    if (algo === 'First Fit') res = calculateFirstFit(blocks, processes);
    else if (algo === 'Best Fit') res = calculateBestFit(blocks, processes);
    else if (algo === 'Worst Fit') res = calculateWorstFit(blocks, processes);
    
    if (isRealTime) {
      setSimulatingStep(1);
    } else {
      setSimulatingStep(-1);
    }
    setSimulated(res);
  };

  const currentProcesses = simulated ? (simulatingStep >= 0 ? simulated.processes.slice(0, simulatingStep) : simulated.processes) : [];
  
  const currentBlocks = simulated ? simulated.blocks.map(b => {
    const activeAllocations = b.allocations.filter(a => currentProcesses.some(cp => cp.id === a.processId));
    const usedSize = activeAllocations.reduce((sum, a) => sum + a.size, 0);
    return {
      ...b,
      allocations: activeAllocations,
      currentFreeSize: b.originalSize - usedSize
    };
  }) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Memory Management</h1>
          <p className="text-text-secondary mt-1">Simulate contiguous memory allocation algorithms.</p>
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
                  <option value="First Fit">First Fit</option>
                  <option value="Best Fit">Best Fit</option>
                  <option value="Worst Fit">Worst Fit</option>
                </select>
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

          <div className="glass p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">Memory Blocks</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={newBlockSize}
                onChange={(e) => setNewBlockSize(e.target.value)}
                placeholder="Block Size"
                className="w-full bg-bg-main border border-card-border rounded-md p-2 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
              />
              <button onClick={addBlock} className="p-2 bg-bg-secondary rounded-lg text-accent-primary hover:bg-card-border transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {blocks.map((b, i) => (
                  <motion.div
                    key={`b-${i}-${b}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface border border-card-border rounded-lg text-sm"
                  >
                    <span className="font-mono text-text-primary">{b} KB</span>
                    <button onClick={() => removeBlock(i)} className="text-status-error hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">Processes</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={newProcessSize}
                onChange={(e) => setNewProcessSize(e.target.value)}
                placeholder="Process Size"
                className="w-full bg-bg-main border border-card-border rounded-md p-2 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
              />
              <button onClick={addProcess} className="p-2 bg-bg-secondary rounded-lg text-accent-primary hover:bg-card-border transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence>
                {processes.map((p) => (
                  <motion.div
                    key={`p-${p.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex justify-between items-center p-3 bg-bg-surface border border-card-border rounded-lg text-sm"
                  >
                    <span className="font-bold text-text-primary">P{p.id} <span className="font-normal text-text-secondary">({p.size} KB)</span></span>
                    <button onClick={() => removeProcess(p.id)} className="text-status-error hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
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
              <div className="glass p-6">
                <h3 className="text-xl font-bold text-text-primary mb-6">Memory State</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentBlocks.map((b) => (
                    <div key={b.id} className="bg-bg-secondary border border-card-border rounded-xl overflow-hidden flex flex-col h-40">
                      <div className="p-3 bg-bg-surface border-b border-card-border text-center">
                        <span className="font-bold text-text-primary text-sm">Block {b.id + 1} ({b.originalSize} KB)</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-end p-2 gap-1 relative">
                        {b.allocations.map((a, i) => (
                          <div 
                            key={i} 
                            className="w-full bg-accent-primary/20 border border-accent-primary rounded flex items-center justify-center text-xs font-bold text-accent-primary py-1"
                            style={{ flexGrow: a.size / b.originalSize }}
                          >
                            P{a.processId} ({a.size} KB)
                          </div>
                        ))}
                        {b.currentFreeSize > 0 && (
                          <div 
                            className="w-full bg-status-success/10 border border-status-success/50 rounded flex items-center justify-center text-xs text-status-success py-1 mt-auto"
                            style={{ flexGrow: b.currentFreeSize / b.originalSize }}
                          >
                            Free: {b.currentFreeSize} KB
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-text-primary mb-4">Allocation Details</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-card-border bg-bg-secondary">
                      <th className="p-4 text-text-secondary font-semibold text-sm rounded-tl-lg">Process No.</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm">Process Size</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm rounded-tr-lg">Block Allocated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProcesses.map((p, i) => (
                      <motion.tr
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={p.id}
                        className="border-b border-card-border hover:bg-bg-secondary/50 transition-colors"
                      >
                        <td className="p-4 font-bold text-text-primary">P{p.id}</td>
                        <td className="p-4 text-text-primary">{p.size} KB</td>
                        <td className="p-4 text-text-primary">
                          {p.isAllocated ? (
                            <span className="text-status-success font-semibold">Block {p.allocatedBlock + 1}</span>
                          ) : (
                            <span className="text-status-error font-semibold">Not Allocated</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className="glass h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-card-border bg-bg-surface/50">
              <RefreshCw className="w-16 h-16 text-text-muted mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No Simulation Data</h3>
              <p className="text-text-secondary">Configure memory blocks and processes, then click simulate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryManagement;
