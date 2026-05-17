import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CPUScheduling from './pages/CPUScheduling';
import DiskScheduling from './pages/DiskScheduling';
import MemoryManagement from './pages/MemoryManagement';
import DeadlockDetection from './pages/DeadlockDetection';
import PageReplacement from './pages/PageReplacement';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cpu-scheduling" element={<CPUScheduling />} />
          <Route path="disk-scheduling" element={<DiskScheduling />} />
          <Route path="memory-management" element={<MemoryManagement />} />
          <Route path="deadlock-detection" element={<DeadlockDetection />} />
          <Route path="page-replacement" element={<PageReplacement />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
