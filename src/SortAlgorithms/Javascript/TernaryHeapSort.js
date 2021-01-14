/**

**/
export default function getTernaryHeapSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  const rarr = ternaryHeapSort(arr, arr.length, animations);
  console.log(rarr);
  return animations;
}

function ternaryHeapSort(arr, n, animations){
  for(let i = n-1 /3; i >= 0; i--){
    ternaryHeapify(arr,n-1,i, animations);
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
  const temp2 = arr[j];
  arr[i] = temp2;
  arr[j] = temp;
}
