import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateBankers } from '../algorithms/deadlock';
import { Play, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

const DeadlockDetection = () => {
  const numProcesses = 5;
  const numResources = 3;

  const [allocation, setAllocation] = useState([
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2],
  ]);

  const [max, setMax] = useState([
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3],
  ]);

  const [available, setAvailable] = useState([3, 3, 2]);

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

  const handleAllocationChange = (i, j, val) => {
    const newAlloc = [...allocation];
    newAlloc[i][j] = Number(val);
    setAllocation(newAlloc);
  };

  const handleMaxChange = (i, j, val) => {
    const newMax = [...max];
    newMax[i][j] = Number(val);
    setMax(newMax);
  };

  const handleAvailableChange = (j, val) => {
    const newAvail = [...available];
    newAvail[j] = Number(val);
    setAvailable(newAvail);
  };

  const handleSimulate = () => {
    const res = calculateBankers(allocation, max, available, numProcesses, numResources);
    if (isRealTime) {
      setSimulatingStep(1);
    } else {
      setSimulatingStep(-1);
    }
    setSimulated(res);
  };

  const currentSteps = simulated ? (simulatingStep >= 0 ? simulated.steps.slice(0, simulatingStep) : simulated.steps) : [];
  const isFinished = simulated && simulatingStep === -1;

  const resourceLabels = ['A', 'B', 'C'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Deadlock Detection</h1>
          <p className="text-text-secondary mt-1">Simulate Banker's Algorithm for deadlock avoidance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">Initial State</h3>
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Available Resources (A, B, C)</label>
                <div className="flex gap-2">
                  {available.map((val, j) => (
                    <input
                      key={`avail-${j}`}
                      type="number"
                      min="0"
                      value={val}
                      onChange={(e) => handleAvailableChange(j, e.target.value)}
                      className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors text-center font-mono"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Allocation Matrix</label>
                <div className="space-y-2">
                  {allocation.map((row, i) => (
                    <div key={`alloc-${i}`} className="flex items-center gap-2">
                      <span className="text-xs font-bold w-6 text-text-muted">P{i}</span>
                      {row.map((val, j) => (
                        <input
                          key={`alloc-${i}-${j}`}
                          type="number"
                          min="0"
                          value={val}
                          onChange={(e) => handleAllocationChange(i, j, e.target.value)}
                          className="w-full bg-bg-surface border border-card-border rounded-md p-1.5 text-text-primary focus:outline-none focus:border-accent-primary transition-colors text-center text-sm"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Max Matrix</label>
                <div className="space-y-2">
                  {max.map((row, i) => (
                    <div key={`max-${i}`} className="flex items-center gap-2">
                      <span className="text-xs font-bold w-6 text-text-muted">P{i}</span>
                      {row.map((val, j) => (
                        <input
                          key={`max-${i}-${j}`}
                          type="number"
                          min="0"
                          value={val}
                          onChange={(e) => handleMaxChange(i, j, e.target.value)}
                          className="w-full bg-bg-surface border border-card-border rounded-md p-1.5 text-text-primary focus:outline-none focus:border-accent-primary transition-colors text-center text-sm"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
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
                className="w-full py-3 rounded-lg bg-accent-primary text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Simulate Banker's Algorithm
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
              {isFinished && (
                <div className={`glass p-6 border-l-4 ${simulated.isSafe ? 'border-l-status-success bg-status-success/5' : 'border-l-status-error bg-status-error/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${simulated.isSafe ? 'bg-status-success/20 text-status-success' : 'bg-status-error/20 text-status-error'}`}>
                      {simulated.isSafe ? <CheckCircle className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${simulated.isSafe ? 'text-status-success' : 'text-status-error'}`}>
                        {simulated.isSafe ? 'System is in a Safe State' : 'System is DEADLOCKED!'}
                      </h3>
                      <p className="text-text-secondary mt-1">
                        {simulated.isSafe 
                          ? 'All processes can finish execution without causing a deadlock.' 
                          : 'Cannot satisfy resource requests for all processes. Unsafe state detected.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isFinished && simulated.isSafe && (
                <div className="glass p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Safe Sequence</h3>
                  <div className="flex flex-wrap gap-2 items-center text-text-secondary">
                    {simulated.safeSequence.map((p, i) => (
                        <span key={i} className="flex items-center gap-2">
                            <span className="px-4 py-2 bg-accent-primary text-white rounded-lg font-bold shadow-sm">P{p}</span>
                            {i < simulated.safeSequence.length - 1 && <span className="font-bold text-lg text-text-muted">→</span>}
                        </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-text-primary mb-4">Need Matrix (Max - Allocation)</h3>
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-card-border bg-bg-secondary">
                      <th className="p-4 text-text-secondary font-semibold text-sm rounded-tl-lg">Process</th>
                      {resourceLabels.map(r => <th key={r} className="p-4 text-text-secondary font-semibold text-sm">{r}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {simulated.need.map((row, i) => (
                      <tr key={`need-${i}`} className="border-b border-card-border hover:bg-bg-secondary/50">
                        <td className="p-4 font-bold text-text-primary">P{i}</td>
                        {row.map((val, j) => (
                          <td key={`need-${i}-${j}`} className="p-4 text-text-secondary font-mono">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="glass p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Execution Steps</h3>
                <div className="space-y-4">
                  {currentSteps.map((step, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={index} 
                      className="p-4 rounded-xl bg-bg-surface border border-card-border text-sm"
                    >
                      {step.type === 'PROCESS_SELECTED' ? (
                        <>
                          <div className="font-bold text-accent-primary mb-2 flex items-center gap-2">
                            <Play className="w-4 h-4" /> Evaluating P{step.process}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-text-secondary">
                            <div><span className="font-semibold text-text-primary">Need:</span> [{step.need.join(', ')}]</div>
                            <div><span className="font-semibold text-text-primary">Available:</span> [{step.workBefore.join(', ')}]</div>
                            <div className="text-status-success font-semibold">Need ≤ Available (Can Execute)</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-status-success mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> P{step.process} Completed
                          </div>
                          <div className="text-text-secondary">
                            Resources Released. <span className="font-semibold text-text-primary">New Available:</span> [{step.workAfter.join(', ')}]
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-card-border bg-bg-surface/50">
              <RefreshCw className="w-16 h-16 text-text-muted mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No Simulation Data</h3>
              <p className="text-text-secondary">Configure resources and processes, then run Banker's Algorithm.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeadlockDetection;
