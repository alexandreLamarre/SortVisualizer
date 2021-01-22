/**

**/
export default function getTernaryHeapSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
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
    animations.push({select:[l]});
  }
  if(r < n && arr[r] > arr[largest]) {
    largest = r;
    animations.push({select: [r]});
  }
  if(m < n && arr[m] > arr[largest]){
    largest = m;
    animations.push({select: [m]});
  }

  if(largest !== i){
    swap(arr, i , largest, animations);
    ternaryHeapify(arr, n, largest, animations);
  }
}

function swap(arr, i, j, animations){
  animations.push({swap:[i,j], select: [i,j]});
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
