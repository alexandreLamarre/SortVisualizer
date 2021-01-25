var COMPARISONS;
var SWAPS;

/**

**/
export default function getIntroSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  const depth = 2*Math.floor(Math.log(arr.length));
  COMPARISONS = 0;
  SWAPS = 0;
  introSort(arr, 0, arr.length-1, depth, animations);
  return animations;
}

function introSort(arr, l, r, depth, animations){
  if(l >= r) return; //sub-array of length 1
  else if(depth === 0){
    heapSort(arr, l, r, animations);
  }
  else{
    const pivot = partition(arr, l, r, animations);
    introSort(arr, l, pivot-1, depth -1, animations);
    introSort(arr, pivot + 1, r, depth -1, animations);
  }
}

/**

**/
function partition(arr, l, r, animations){
  var pivot = arr[r];

  let i = l - 1;
  for(let j = l; j <= r-1; j++){
    if(arr[j] < pivot){
      COMPARISONS ++;
      i++;
      //swap array[i] and array[j]
      swap(arr, i, j, animations);
    }
  }
  //swap array[i+1] and arr[r]
  swap(arr, i+1, r, animations);
  return (i + 1)
}

function heapSort(arr, l, r, animations){
  for(let i = Math.floor(r/2)+1; i >= l; i--){
    heapify(arr, l, r, i, animations);
  }

  for(let i = r; i > l+1; i--){
    swap(arr, l, i, animations);
    heapify(arr, l, i-1, l, animations)
  }
}

function heapify(arr, l, r, i, animations){
  var largest = i;
  const left = 2*i + 1;
  const right = 2*i + 2;
  if(left <= r && left >= l && arr[left] > arr[largest]){
    largest = left;
    animations.push({select: [left], comparisons: ++COMPARISONS});
  }
  if(right <= r && right >= l && arr[right] > arr[largest]){
    COMPARISONS += 2;
    animations.push({select: [right], comparisons: COMPARISONS});
    largest = right;
  }
  if(largest !== i){
    COMPARISONS += 2;
    swap(arr, i, largest, animations);
    heapify(arr, l, r, largest, animations)
  }
}

/**
**/
function swap(arr, i , j , animations){
  animations.push({
    swap: [i,j],
    select: [i,j],
    comparisons: COMPARISONS,
    swaps: ++SWAPS
  });
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
