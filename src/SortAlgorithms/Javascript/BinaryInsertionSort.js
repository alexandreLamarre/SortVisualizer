var COMPARISONS = 0;
var WRITES = 0;

/**

**/
export default function getBinaryInsertionSortAnimations(rand_arr){
  const animations = [];
  const arr = rand_arr.slice();
  COMPARISONS = 0;
  WRITES = 0;
  binaryInsertionSortAnimate(arr, animations)
  return animations;
}

/**
@param arr array to sort
@param animations array to push animations to
**/
function binaryInsertionSortAnimate(arr, animations){
  for(let i = 1; i < arr.length; i++){
    const key = arr[i];
    let j = i - 1;
    let pivot = binarySearch(arr, 0, j, key, animations);

    while(j >= pivot){
      COMPARISONS ++;
      WRITES ++;
      animations.push({
        select: [j+1, j],
        set: [j+1, arr[j]],
        comparisons: COMPARISONS,
        writes: WRITES,
      });
      arr[j+1] = arr[j];
      j--;
    }
    WRITES ++;
    COMPARISONS ++;
    animations.push({
      select: [j+1],
      set: [j+1, key],
      comparisons: COMPARISONS,
      writes: WRITES,
    });
    arr[j+1] = key;

  }
  return animations
}

/**

**/
function binarySearch(arr, start, end, val, animations){
  animations.push({select: [start,end], comparisons: COMPARISONS});
  if(start === end){
    COMPARISONS ++;
    if(arr[start] > val){
      return start;
    }
    else{
      return start+1;
    }
  }

  if(start > end) return start;

  const mid = Math.floor((start+end)/2);
  if(arr[mid] < val){
    COMPARISONS += 1;
    return binarySearch(arr,mid+1, end, val, animations);
  }
  else if (arr[mid] > val){
    COMPARISONS += 2;
    return binarySearch(arr, start, mid - 1, val, animations);
  }
  else{
    COMPARISONS += 2;
    return mid;
  }
}
