export const calculateFIFO = (referenceString, framesCount) => {
  let frames = [];
  let pageFaults = 0;
  let steps = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    let isHit = false;

    if (frames.includes(page)) {
      isHit = true;
    } else {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        frames.shift();
        frames.push(page);
      }
      pageFaults++;
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      pageFaults
    });
  }

  return { steps, totalFaults: pageFaults };
};

export const calculateLRU = (referenceString, framesCount) => {
  let frames = [];
  let pageFaults = 0;
  let steps = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    let isHit = false;

    if (frames.includes(page)) {
      isHit = true;
      // Move to end (most recently used)
      frames = frames.filter(f => f !== page);
      frames.push(page);
    } else {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        frames.shift();
        frames.push(page);
      }
      pageFaults++;
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      pageFaults
    });
  }

  return { steps, totalFaults: pageFaults };
};

export const calculateOptimal = (referenceString, framesCount) => {
  let frames = [];
  let pageFaults = 0;
  let steps = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    let isHit = false;

    if (frames.includes(page)) {
      isHit = true;
    } else {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        let farthestIdx = -1;
        let replaceTarget = -1;
        
        for (let j = 0; j < frames.length; j++) {
          let nextUse = -1;
          for (let k = i + 1; k < referenceString.length; k++) {
            if (frames[j] === referenceString[k]) {
              nextUse = k;
              break;
            }
          }
          
          if (nextUse === -1) {
            replaceTarget = j;
            break; // Will not be used again
          }
          if (nextUse > farthestIdx) {
            farthestIdx = nextUse;
            replaceTarget = j;
          }
        }
        
        frames[replaceTarget] = page;
      }
      pageFaults++;
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      pageFaults
    });
  }

  return { steps, totalFaults: pageFaults };
};
