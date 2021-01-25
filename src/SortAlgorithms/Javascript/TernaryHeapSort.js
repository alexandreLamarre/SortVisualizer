var SWAPS;
var COMPARISONS;
/**

**/
export default function getTernaryHeapSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  SWAPS = 0;
  COMPARISONS = 0;
  ternaryHeapSort(arr, arr.length, animations);
  return animations;
}

function ternaryHeapSort(arr, n, animations){
  for(let i = Math.floor(n/3); i >= 0; i--){
    ternaryHeapify(arr,n,i-1, animations);
  }

  for(let i = n - 1; i > 0; i--){
    swap(arr, 0, i, animations);
    ternaryHeapify(arr, i , 0, animations);
  }
  return arr;
}

function ternaryHeapify(arr, n, i, animations){
  var largest = i;
  const l = 3*i + 1;
  const m = 3*i + 2;
  const r = 3*i + 3;
  if(l < n && arr[l] > arr[largest]) {
    largest = l;
    animations.push({select:[l], comparisons: ++COMPARISONS});
  }
  if(r < n && arr[r] > arr[largest]) {
    COMPARISONS += 2;
    largest = r;
    animations.push({select: [r], comparisons: COMPARISONS});
  }
  if(m < n && arr[m] > arr[largest]){
    COMPARISONS += 3;
    largest = m;
    animations.push({select: [m], comparisons: COMPARISONS});
  }

  if(largest !== i){
    COMPARISONS += 3;
    swap(arr, i , largest, animations);
    ternaryHeapify(arr, n, largest, animations);
  }
}

function swap(arr, i, j, animations){
  animations.push({swap:[i,j], select: [i,j], swaps: ++SWAPS});
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
