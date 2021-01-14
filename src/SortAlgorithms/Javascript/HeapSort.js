/**

**/
export default function getMaxHeapSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  maxHeapSort(arr, animations);
  return animations;
}

/** **/
function maxHeapSort(arr, animations){
  buildMaxHeap(arr, animations);
  for(let i = arr.length-1; i>=0; i--){
    swap(arr, 0, i, animations);
    maxHeapify(arr, 0, animations, i);
  }
}

/** **/
function buildMaxHeap(arr, animations){
  for(let i = arr.length/2-1; i >= 0; i--){
    maxHeapify(arr, i, animations, arr.length);
  }
}

function maxHeapify(arr, i, animations, heapSize){
  var l = left(i);
  var r = right(i);
  var largest;
  if(l <= heapSize&& arr[l] > arr[i]) largest = l;
  else{largest = i}

  if(r <= heapSize && arr[r] > arr[largest]) largest =r;

  if(largest!== i) swap(arr, i, largest, animations);
}

function left(i){
  return 2*i + 1;
}

function right(i){
  return 2*i+2;
}

function parent(i){
  return (i-1)/2;
}

function swap(arr, i, j, animations){
  animations.push({swap: [i,j], select:[i,j]});
  const temp = arr[i];
  const temp2 = arr[j];
  arr[i] = temp2;
  arr[j] = temp;
}
