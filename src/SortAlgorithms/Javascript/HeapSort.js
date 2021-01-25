var SWAPS;
var COMPARISONS;
/**

**/
export default function getMaxHeapSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  SWAPS = 0;
  COMPARISONS = 0;
  heapSort(arr, arr.length, animations);

  return animations;
}

function heapSort(arr, n, animations){
  for(let i = Math.floor(n/2) -1; i >= 0; i--){
    heapify(arr,n,i, animations);
  }

  for(let i = n - 1; i > 0; i--){
    swap(arr, 0, i, animations);
    heapify(arr, i , 0, animations);
  }
  return arr;
}

function heapify(arr, n, i, animations){
  var largest = i;
  const l = 2*i + 1;
  const r = 2*i+2;
  if(l < n && arr[l] > arr[largest]) {
    largest = l;
    animations.push({select:[l], comparisons: ++COMPARISONS});
  }
  if(r < n && arr[r] > arr[largest]) {
    largest = r;
    COMPARISONS += 2;
    animations.push({select: [r], comparisons: COMPARISONS});
  }

  if(largest !== i){
    COMPARISONS += 2;
    swap(arr, i , largest, animations);
    heapify(arr, n, largest, animations);
  }
}

function swap(arr, i, j, animations){
  animations.push({swap:[i,j], select: [i,j], swaps: ++SWAPS});
  const temp = arr[i];
  const temp2 = arr[j];
  arr[i] = temp2;
  arr[j] = temp;
}
