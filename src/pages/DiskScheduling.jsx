import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDiskFCFS, calculateSSTF, calculateSCAN, calculateCSCAN, calculateLOOK } from '../algorithms/disk';
import { Play, Plus, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DiskScheduling = () => {
  const [algo, setAlgo] = useState('FCFS');
  const [head, setHead] = useState(50);
  const [queueInput, setQueueInput] = useState('82,170,43,140,24,16,190');
  const [simulated, setSimulated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [simulatingStep, setSimulatingStep] = useState(-1);

  useEffect(() => {
    if (simulated && simulatingStep >= 0 && simulatingStep < simulated.chartData.length) {
      const timer = setTimeout(() => {
        setSimulatingStep(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (simulated && simulatingStep === simulated.chartData.length) {
      setSimulatingStep(-1);
    }
  }, [simulated, simulatingStep]);

  const handleSimulate = () => {
    const queue = queueInput.split(',').map(x => Number(x.trim())).filter(x => !isNaN(x));
    let res = null;
    
    if (algo === 'FCFS') res = calculateDiskFCFS(queue, head);
    else if (algo === 'SSTF') res = calculateSSTF(queue, head);
    else if (algo === 'SCAN') res = calculateSCAN(queue, head, 'right');
    else if (algo === 'CSCAN') res = calculateCSCAN(queue, head, 'right');
    else if (algo === 'LOOK') res = calculateLOOK(queue, head, 'right');

    const chartData = res.sequence.map((track, i) => ({
      step: i,
      track: track
    }));

    if (isRealTime) {
      setSimulatingStep(1); // Start with initial head at index 0 (length 1)
    } else {
      setSimulatingStep(-1);
    }
    setSimulated({ ...res, chartData });
  };

  const currentChartData = simulated ? (simulatingStep >= 0 ? simulated.chartData.slice(0, simulatingStep) : simulated.chartData) : [];
  const currentSequence = simulated ? (simulatingStep >= 0 ? simulated.sequence.slice(0, simulatingStep) : simulated.sequence) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Disk Scheduling Visualizer</h1>
          <p className="text-text-secondary mt-1">Visualize head movement and seek time for disk scheduling algorithms.</p>
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
                  <option value="FCFS">FCFS (First Come First Serve)</option>
                  <option value="SSTF">SSTF (Shortest Seek Time First)</option>
                  <option value="SCAN">SCAN</option>
                  <option value="CSCAN">C-SCAN</option>
                  <option value="LOOK">LOOK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Initial Head Position</label>
                <input
                  type="number"
                  min="0"
                  max="199"
                  value={head}
                  onChange={(e) => setHead(Number(e.target.value))}
                  className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">Request Queue (comma separated)</label>
                <textarea
                  rows="3"
                  value={queueInput}
                  onChange={(e) => setQueueInput(e.target.value)}
                  className="w-full bg-bg-surface border border-card-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none custom-scrollbar"
                  placeholder="e.g. 82, 170, 43..."
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
          
          <div className="glass p-6">
              <h3 className="text-lg font-bold text-text-primary mb-3">Instructions</h3>
              <ul className="text-sm text-text-secondary space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 flex-shrink-0" />
                    <span>Enter the initial position of the disk head (0-199).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 flex-shrink-0" />
                    <span>Provide a list of track requests separated by commas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 flex-shrink-0" />
                    <span>Select the desired disk scheduling algorithm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 flex-shrink-0" />
                    <span>Click Simulate to generate the head movement graph.</span>
                  </li>
              </ul>
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
                <div className="glass p-6 text-center border-t-4" style={{borderTopColor: 'var(--accent-primary)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Total Seek Time</p>
                  <p className="text-4xl font-bold text-text-primary mt-2">{simulated.seekTime}</p>
                </div>
                <div className="glass p-6 text-center border-t-4" style={{borderTopColor: 'var(--accent-secondary)'}}>
                  <p className="text-text-secondary text-sm font-semibold">Sequence Length</p>
                  <p className="text-4xl font-bold text-text-primary mt-2">{simulated.sequence.length}</p>
                </div>
              </div>

              <div className="glass p-6">
                <h3 className="text-xl font-bold text-text-primary mb-6">Head Movement Graph</h3>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" horizontal={true} vertical={true} />
                      <XAxis type="number" dataKey="track" domain={[0, 199]} stroke="var(--text-secondary)" orientation="top" axisLine={false} tickLine={false} />
                      <YAxis type="number" dataKey="step" reversed stroke="var(--text-secondary)" axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        labelFormatter={(label) => `Step: ${label}`}
                        formatter={(value) => [value, 'Track']}
                      />
                      <Line
                        type="linear"
                        dataKey="track"
                        stroke="var(--accent-primary)"
                        strokeWidth={3}
                        dot={{ r: 5, fill: 'var(--bg-surface)', strokeWidth: 2, stroke: 'var(--accent-secondary)' }}
                        activeDot={{ r: 7, fill: 'var(--accent-primary)', stroke: 'none' }}
                        isAnimationActive={!isRealTime}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Seek Sequence</h3>
                  <div className="flex flex-wrap gap-2 items-center text-text-secondary">
                      {currentSequence.map((s, i) => (
                          <span key={i} className="flex items-center gap-2">
                              <span className="px-3 py-1.5 bg-bg-secondary rounded-lg border border-card-border font-mono text-accent-primary font-semibold text-sm">{s}</span>
                              {i < simulated.sequence.length - 1 && <ArrowRight className="w-4 h-4 text-text-muted" />}
                          </span>
                      ))}
                  </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-card-border bg-bg-surface/50">
              <RefreshCw className="w-16 h-16 text-text-muted mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No Simulation Data</h3>
              <p className="text-text-secondary">Configure your disk requests and click simulate to visualize head movement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiskScheduling;
