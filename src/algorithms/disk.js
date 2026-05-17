export const calculateDiskFCFS = (queue, head) => {
  let sequence = [head, ...queue];
  let seekTime = 0;
  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }
  return { sequence, seekTime };
};

export const calculateSSTF = (queue, head) => {
  let sequence = [head];
  let remaining = [...queue];
  let currentHead = head;
  let seekTime = 0;

  while (remaining.length > 0) {
    let closestIndex = 0;
    let minDistance = Math.abs(currentHead - remaining[0]);

    for (let i = 1; i < remaining.length; i++) {
      let distance = Math.abs(currentHead - remaining[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    currentHead = remaining[closestIndex];
    sequence.push(currentHead);
    seekTime += minDistance;
    remaining.splice(closestIndex, 1);
  }

  return { sequence, seekTime };
};

export const calculateSCAN = (queue, head, direction = 'right', maxTrack = 199) => {
  let sequence = [head];
  let seekTime = 0;
  let sortedQueue = [...queue].sort((a, b) => a - b);
  
  let left = sortedQueue.filter(x => x < head);
  let right = sortedQueue.filter(x => x >= head);

  if (direction === 'left') {
    left.reverse();
    for(let r of left) { sequence.push(r); }
    if(left.length > 0) sequence.push(0);
    for(let r of right) { sequence.push(r); }
  } else {
    for(let r of right) { sequence.push(r); }
    if(right.length > 0) sequence.push(maxTrack);
    left.reverse();
    for(let r of left) { sequence.push(r); }
  }

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};

export const calculateCSCAN = (queue, head, direction = 'right', maxTrack = 199) => {
  let sequence = [head];
  let seekTime = 0;
  let sortedQueue = [...queue].sort((a, b) => a - b);
  
  let left = sortedQueue.filter(x => x < head);
  let right = sortedQueue.filter(x => x >= head);

  if (direction === 'right') {
    for(let r of right) { sequence.push(r); }
    if(right.length > 0) {
        sequence.push(maxTrack);
        sequence.push(0);
    }
    for(let r of left) { sequence.push(r); }
  } else {
    left.reverse();
    for(let r of left) { sequence.push(r); }
    if(left.length > 0) {
        sequence.push(0);
        sequence.push(maxTrack);
    }
    right.reverse();
    for(let r of right) { sequence.push(r); }
  }

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};

export const calculateLOOK = (queue, head, direction = 'right') => {
  let sequence = [head];
  let seekTime = 0;
  let sortedQueue = [...queue].sort((a, b) => a - b);
  
  let left = sortedQueue.filter(x => x < head);
  let right = sortedQueue.filter(x => x >= head);

  if (direction === 'left') {
    left.reverse();
    for(let r of left) { sequence.push(r); }
    for(let r of right) { sequence.push(r); }
  } else {
    for(let r of right) { sequence.push(r); }
    left.reverse();
    for(let r of left) { sequence.push(r); }
  }

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};
