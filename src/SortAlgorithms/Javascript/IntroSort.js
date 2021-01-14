/**

**/
export default function getIntroSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  const depthLimit = 2*Math.floor(Math.log(arr.length));
  introSort(arr,0, arr.length-1, depthLimit, animations);
  console.log(arr);
  return [];
}

function introSort(arr, l, r, depth, animations){
  if(r-l <= 16 && r-l > 0){
    insertionSort(arr, l, r, animations);
  }
  if(depth === 0){
    heapSort(arr, l, r, animations);
  }
  else{
    const pivot = partitionPivot(arr, l, r, animations);
    introSort(arr, l, pivot-1, depth-1, animations);
    introSort(arr, pivot+1, r, depth -1, animations);
  }
}

/**

**/
function partitionPivot(arr, l, r, animations){
  const pivot = Math.random() % (r-l+1) + l;
  swap(arr, pivot, r, animations);
  return partition(arr, l, r, animations);
}

/**
**/
function partition(arr, l, r, animations){
  const pivot = arr[r];
  var pIndex = arr[l];

  for(let i = l; i < r; i++){
    if(arr[i] <= pivot){
      swap(arr, i, pIndex, animations);
      pIndex ++;
    }
  }

  swap(arr, pIndex, r, animations);
  return pIndex;
}

/**
**/
function insertionSort(arr, l, r, animations){
  for(let i = l + 1; i <= r; i++){
    const key = arr[i];
    var j = i;
    while(j > l && arr[j-1] > key){
      animations.push({set:[j, arr[j-1]], select: [j]});
      arr[j] = arr[j-1];
      j--;
    }
    animations.push({set: [j, key], select: [j]});
  }
}

/**

**/
function heapSort(arr, l, r, animations){
  buildHeap(arr, l, r, animations);
  sortHeap(arr, l, r, animations);
}

/**

**/
function buildHeap(arr, l, r, animations){
  for(let i = r/2-1; i >= l; i--){
    heapify(arr, i, l, r, animations)
  }
}

/**

**/
function sortHeap(arr, l, r, animations){
  for(let i = r-1; i > l; i--){
    swap(arr, l, i, animations);
    heapify(arr, i, l, r, animations);
  }
}

/**

**/
function heapify(arr, i, l, r, animations){
  var largest = i;
  const left = 2*i + 1;
  const right = 2*i + 2;
  if(left < r && arr[l] > arr[largest]){
    largest = left;
    animations.push({select: [left]});
  }
  if(right < r && arr[r] > arr[largest]){
    largest = right;
    animations.push({select: [right]});
  }

  if(largest !== i){
    swap(arr, i, largest, animations);
    heapify(arr, largest, l, r, animations);
  }
}

function swap(arr, i, j, animations){
  animations.push({select: [i,j], swap: [i,j]});
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}
