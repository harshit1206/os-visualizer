export const calculateFCFS = (processes) => {
  let time = 0;
  const result = [];
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  sorted.forEach((p) => {
    if (time < p.arrival) time = p.arrival;
    const start = time;
    time += p.burst;
    const completion = time;
    const turnaround = completion - p.arrival;
    const waiting = turnaround - p.burst;
    
    result.push({
      ...p,
      start,
      completion,
      turnaround,
      waiting,
      response: waiting, // for FCFS response = waiting
    });
  });
  return result;
};

export const calculateSJF = (processes) => {
  let time = 0;
  const result = [];
  const remaining = [...processes].map(p => ({ ...p }));
  let completed = 0;

  while (completed < processes.length) {
    const available = remaining.filter((p) => p.arrival <= time && !p.isCompleted);
    
    if (available.length > 0) {
      available.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
      const p = available[0];
      const start = time;
      time += p.burst;
      
      const pIndex = remaining.findIndex(x => x.id === p.id);
      remaining[pIndex].isCompleted = true;
      
      const completion = time;
      const turnaround = completion - p.arrival;
      const waiting = turnaround - p.burst;
      
      result.push({
        ...p,
        start,
        completion,
        turnaround,
        waiting,
        response: waiting,
      });
      completed++;
    } else {
      time++;
    }
  }
  return result.sort((a, b) => a.start - b.start);
};

export const calculateRR = (processes, quantum = 2) => {
  let time = 0;
  const result = [];
  const gantt = [];
  const remaining = [...processes].map(p => ({ ...p, remainingBurst: p.burst, firstStart: -1 })).sort((a, b) => a.arrival - b.arrival);
  
  const queue = [];
  let completed = 0;
  let currentIdx = 0;
  
  // push initial processes
  while(currentIdx < remaining.length && remaining[currentIdx].arrival <= time) {
    queue.push(remaining[currentIdx]);
    currentIdx++;
  }
  
  if (queue.length === 0 && currentIdx < remaining.length) {
    time = remaining[currentIdx].arrival;
    queue.push(remaining[currentIdx]);
    currentIdx++;
  }

  while (completed < processes.length) {
    if (queue.length === 0) {
      time++;
      while(currentIdx < remaining.length && remaining[currentIdx].arrival <= time) {
        queue.push(remaining[currentIdx]);
        currentIdx++;
      }
      continue;
    }

    const p = queue.shift();
    if (p.firstStart === -1) p.firstStart = time;
    
    const execTime = Math.min(quantum, p.remainingBurst);
    gantt.push({ id: p.id, start: time, end: time + execTime, name: p.name });
    
    time += execTime;
    p.remainingBurst -= execTime;

    while(currentIdx < remaining.length && remaining[currentIdx].arrival <= time) {
      queue.push(remaining[currentIdx]);
      currentIdx++;
    }

    if (p.remainingBurst > 0) {
      queue.push(p);
    } else {
      const turnaround = time - p.arrival;
      const waiting = turnaround - p.burst;
      result.push({
        ...p,
        completion: time,
        turnaround,
        waiting,
        response: p.firstStart - p.arrival,
      });
      completed++;
    }
  }
  
  return { processes: result.sort((a, b) => a.id - b.id), gantt };
};

export const calculatePriority = (processes) => {
  // Non-preemptive priority (lower number = higher priority)
  let time = 0;
  const result = [];
  const remaining = [...processes].map(p => ({ ...p }));
  let completed = 0;

  while (completed < processes.length) {
    const available = remaining.filter((p) => p.arrival <= time && !p.isCompleted);
    
    if (available.length > 0) {
      available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
      const p = available[0];
      const start = time;
      time += p.burst;
      
      const pIndex = remaining.findIndex(x => x.id === p.id);
      remaining[pIndex].isCompleted = true;
      
      const completion = time;
      const turnaround = completion - p.arrival;
      const waiting = turnaround - p.burst;
      
      result.push({
        ...p,
        start,
        completion,
        turnaround,
        waiting,
        response: waiting,
      });
      completed++;
    } else {
      time++;
    }
  }
  return result.sort((a, b) => a.start - b.start);
};
