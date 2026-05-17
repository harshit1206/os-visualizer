export const calculateBankers = (allocation, max, available, numProcesses, numResources) => {
  let need = Array.from({ length: numProcesses }, () => Array(numResources).fill(0));
  for (let i = 0; i < numProcesses; i++) {
    for (let j = 0; j < numResources; j++) {
      need[i][j] = max[i][j] - allocation[i][j];
    }
  }

  let finish = Array(numProcesses).fill(false);
  let safeSequence = [];
  let work = [...available];
  let isSafe = false;

  let count = 0;
  let steps = [];

  while (count < numProcesses) {
    let found = false;
    for (let p = 0; p < numProcesses; p++) {
      if (!finish[p]) {
        let canAllocate = true;
        for (let j = 0; j < numResources; j++) {
          if (need[p][j] > work[j]) {
            canAllocate = false;
            break;
          }
        }
        
        if (canAllocate) {
          steps.push({
            type: 'PROCESS_SELECTED',
            process: p,
            workBefore: [...work],
            allocation: [...allocation[p]],
            need: [...need[p]]
          });

          for (let k = 0; k < numResources; k++) {
            work[k] += allocation[p][k];
          }
          safeSequence.push(p);
          finish[p] = true;
          found = true;
          count++;
          
          steps.push({
            type: 'PROCESS_COMPLETED',
            process: p,
            workAfter: [...work]
          });
        }
      }
    }
    if (!found) {
      break;
    }
  }

  isSafe = count === numProcesses;

  return {
    need,
    isSafe,
    safeSequence: isSafe ? safeSequence : null,
    deadlockedProcesses: isSafe ? [] : finish.map((f, i) => (!f ? i : null)).filter(x => x !== null),
    steps
  };
};
