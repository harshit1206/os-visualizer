import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateFCFS, calculateSJF, calculateRR, calculatePriority } from '../algorithms/cpu';
import { Play, Plus, Trash2, RefreshCw } from 'lucide-react';

const CPUScheduling = () => {
  const [algo, setAlgo] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState([
    { id: 1, name: 'P1', arrival: 0, burst: 5, priority: 1 },
    { id: 2, name: 'P2', arrival: 1, burst: 3, priority: 2 },
    { id: 3, name: 'P3', arrival: 2, burst: 8, priority: 1 },
    { id: 4, name: 'P4', arrival: 3, burst: 6, priority: 3 },
  ]);

  const [simulated, setSimulated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [simulatingStep, setSimulatingStep] = useState(-1);

  useEffect(() => {
    if (simulated && simulatingStep >= 0 && simulatingStep < simulated.gantt.length) {
      const timer = setTimeout(() => {
        setSimulatingStep(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (simulated && simulatingStep === simulated.gantt.length) {
      setSimulatingStep(-1);
    }
  }, [simulated, simulatingStep]);

  const addProcess = () => {
    const nextId = processes.length ? Math.max(...processes.map(p => p.id)) + 1 : 1;
    setProcesses([...processes, { id: nextId, name: `P${nextId}`, arrival: 0, burst: 1, priority: 1 }]);
  };

  const removeProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const updateProcess = (id, field, value) => {
    setProcesses(processes.map(p => (p.id === id ? { ...p, [field]: Number(value) } : p)));
  };

  const handleSimulate = () => {
    let res = null;
    let ganttData = [];
    if (algo === 'FCFS') {
      res = calculateFCFS(processes);
      ganttData = res.map(p => ({ ...p, end: p.completion }));
    } else if (algo === 'SJF') {
      res = calculateSJF(processes);
      ganttData = res.map(p => ({ ...p, end: p.completion }));
    } else if (algo === 'RR') {
      const output = calculateRR(processes, quantum);
      res = output.processes;
      ganttData = output.gantt;
    } else if (algo === 'Priority') {
      res = calculatePriority(processes);
      ganttData = res.map(p => ({ ...p, end: p.completion }));
    }
    
    if (isRealTime) {
      setSimulatingStep(1); // Start with 1 to show the first step immediately after delay
    } else {
      setSimulatingStep(-1);
    }
    setSimulated({ processes: res, gantt: ganttData });
  };

  const currentGantt = simulated ? (simulatingStep >= 0 ? simulated.gantt.slice(0, simulatingStep) : simulated.gantt) : [];

  const colors = ['#4F46E5', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#6366F1'];

  const avgWait = simulated ? (simulated.processes.reduce((acc, p) => acc + p.waiting, 0) / simulated.processes.length).toFixed(2) : 0;
  const avgTurn = simulated ? (simulated.processes.reduce((acc, p) => acc + p.turnaround, 0) / simulated.processes.length).toFixed(2) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">CPU Scheduling Visualizer</h1>
          <p className="text-text-secondary mt-1">Configure processes and visualize different scheduling algorithms.</p>
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
                  <option value="FCFS">First Come First Serve (FCFS)</option>
                  <option value="SJF">Shortest Job First (SJF)</option>
                  <option value="RR">Round Robin</option>
                  <option value="Priority">Priority (Non-Preemptive)</option>
                </select>
              </div>

              {algo === 'RR' && (
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">Time Quantum</label>
                  <input
                    type="number"
                    min="1"
                    value={quantum}
                    onChange={(e) => setQuantum(Number(e.target.value))}
                    className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                  />
                </div>
              )}
              
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-text-primary">Processes</h3>
              <button onClick={addProcess} className="p-2 bg-bg-secondary rounded-lg text-accent-primary hover:bg-card-border transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {processes.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-xl bg-bg-surface border border-card-border relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: colors[index % colors.length] }} />
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-text-primary ml-2">{p.name}</span>
                      <button onClick={() => removeProcess(p.id)} className="text-status-error hover:opacity-80 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm ml-2">
                      <div>
                        <label className="text-text-muted text-xs font-semibold">Arrival Time</label>
                        <input
                          type="number"
                          min="0"
                          value={p.arrival}
                          onChange={(e) => updateProcess(p.id, 'arrival', e.target.value)}
                          className="w-full bg-bg-main border border-card-border rounded-md p-2 text-text-primary mt-1 focus:border-accent-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-text-muted text-xs font-semibold">Burst Time</label>
                        <input
                          type="number"
                          min="1"
                          value={p.burst}
                          onChange={(e) => updateProcess(p.id, 'burst', e.target.value)}
                          className="w-full bg-bg-main border border-card-border rounded-md p-2 text-text-primary mt-1 focus:border-accent-primary focus:outline-none transition-colors"
                        />
                      </div>
                      {algo === 'Priority' && (
                        <div className="col-span-2">
                          <label className="text-text-muted text-xs font-semibold">Priority</label>
                          <input
                            type="number"
                            min="1"
                            value={p.priority}
                            onChange={(e) => updateProcess(p.id, 'priority', e.target.value)}
                            className="w-full bg-bg-main border border-card-border rounded-md p-2 text-text-primary mt-1 focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                      )}
                    </div>
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
                <h3 className="text-xl font-bold text-text-primary mb-6">Gantt Chart</h3>
                <div className="flex flex-wrap gap-1 p-4 bg-bg-secondary rounded-xl border border-card-border overflow-x-auto min-h-[100px] items-center">
                  {currentGantt.map((block, i) => (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      style={{ originX: 0 }}
                      key={i}
                      className="relative flex flex-col items-center flex-shrink-0"
                    >
                      <div
                        className="h-12 flex items-center justify-center font-bold text-white rounded-lg shadow-sm px-4 min-w-[50px]"
                        style={{ backgroundColor: colors[Number(block.name.replace('P', '')) % colors.length] }}
                      >
                        {block.name}
                      </div>
                      <div className="text-xs text-text-secondary mt-2 font-mono">{block.start} - {block.end}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-6 text-center border-l-4" style={{borderLeftColor: 'var(--accent-primary)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Avg Waiting Time</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{avgWait} <span className="text-base text-text-muted">ms</span></p>
                </div>
                <div className="glass p-6 text-center border-l-4" style={{borderLeftColor: 'var(--accent-secondary)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Avg Turnaround Time</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{avgTurn} <span className="text-base text-text-muted">ms</span></p>
                </div>
              </div>

              <div className="glass p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-text-primary mb-4">Simulation Results</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-card-border bg-bg-secondary">
                      <th className="p-4 text-text-secondary font-semibold text-sm rounded-tl-lg">Process</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm">Arrival</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm">Burst</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm">Completion</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm">Turnaround</th>
                      <th className="p-4 text-text-secondary font-semibold text-sm rounded-tr-lg">Waiting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulated.processes.map((p, i) => (
                      <motion.tr
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={p.id}
                        className="border-b border-card-border hover:bg-bg-secondary/50 transition-colors"
                      >
                        <td className="p-4 font-bold">
                           <span style={{ color: colors[Number(p.name.replace('P', '')) % colors.length] }}>{p.name}</span>
                        </td>
                        <td className="p-4 text-text-primary">{p.arrival}</td>
                        <td className="p-4 text-text-primary">{p.burst}</td>
                        <td className="p-4 text-text-primary">{p.completion}</td>
                        <td className="p-4 text-text-primary">{p.turnaround}</td>
                        <td className="p-4 text-text-primary">{p.waiting}</td>
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
              <p className="text-text-secondary">Configure your processes and click simulate to visualize the scheduling algorithm.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CPUScheduling;
