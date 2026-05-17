export const calculateFirstFit = (blocks, processes) => {
  let blockAllocation = Array(blocks.length).fill(null).map((_, i) => ({ id: i, size: blocks[i], originalSize: blocks[i], allocations: [] }));
  let processStatus = processes.map(p => ({ ...p, allocatedBlock: null, isAllocated: false }));

  for (let i = 0; i < processStatus.length; i++) {
    for (let j = 0; j < blockAllocation.length; j++) {
      if (blockAllocation[j].size >= processStatus[i].size) {
        blockAllocation[j].size -= processStatus[i].size;
        blockAllocation[j].allocations.push({ processId: processStatus[i].id, size: processStatus[i].size });
        processStatus[i].allocatedBlock = blockAllocation[j].id;
        processStatus[i].isAllocated = true;
        break;
      }
    }
  }
  return { blocks: blockAllocation, processes: processStatus };
};

export const calculateBestFit = (blocks, processes) => {
  let blockAllocation = Array(blocks.length).fill(null).map((_, i) => ({ id: i, size: blocks[i], originalSize: blocks[i], allocations: [] }));
  let processStatus = processes.map(p => ({ ...p, allocatedBlock: null, isAllocated: false }));

  for (let i = 0; i < processStatus.length; i++) {
    let bestIdx = -1;
    for (let j = 0; j < blockAllocation.length; j++) {
      if (blockAllocation[j].size >= processStatus[i].size) {
        if (bestIdx === -1 || blockAllocation[j].size < blockAllocation[bestIdx].size) {
          bestIdx = j;
        }
      }
    }
    if (bestIdx !== -1) {
      blockAllocation[bestIdx].size -= processStatus[i].size;
      blockAllocation[bestIdx].allocations.push({ processId: processStatus[i].id, size: processStatus[i].size });
      processStatus[i].allocatedBlock = blockAllocation[bestIdx].id;
      processStatus[i].isAllocated = true;
    }
  }
  return { blocks: blockAllocation, processes: processStatus };
};

export const calculateWorstFit = (blocks, processes) => {
  let blockAllocation = Array(blocks.length).fill(null).map((_, i) => ({ id: i, size: blocks[i], originalSize: blocks[i], allocations: [] }));
  let processStatus = processes.map(p => ({ ...p, allocatedBlock: null, isAllocated: false }));

  for (let i = 0; i < processStatus.length; i++) {
    let worstIdx = -1;
    for (let j = 0; j < blockAllocation.length; j++) {
      if (blockAllocation[j].size >= processStatus[i].size) {
        if (worstIdx === -1 || blockAllocation[j].size > blockAllocation[worstIdx].size) {
          worstIdx = j;
        }
      }
    }
    if (worstIdx !== -1) {
      blockAllocation[worstIdx].size -= processStatus[i].size;
      blockAllocation[worstIdx].allocations.push({ processId: processStatus[i].id, size: processStatus[i].size });
      processStatus[i].allocatedBlock = blockAllocation[worstIdx].id;
      processStatus[i].isAllocated = true;
    }
  }
  return { blocks: blockAllocation, processes: processStatus };
};
