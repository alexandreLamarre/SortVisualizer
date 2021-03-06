var COMPARISONS;
var SWAPS;

/**

**/
export default function getDualQuickSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  COMPARISONS = 0;
  SWAPS = 0;
  dualQuickSort(arr, 0, arr.length -1, animations);
  return animations;
}


/**

**/
function dualQuickSort(arr, l, r, animations){
  if(l < r){
    var [pivot1, pivot2] = partition(arr, l, r, animations);

    dualQuickSort(arr, l, pivot1 -1, animations);
    dualQuickSort(arr, pivot1+1, pivot2 -1, animations);
    dualQuickSort(arr, pivot2 + 1, r, animations);
  }
}

/**

**/
function partition(arr, l, r, animations){
  if(arr[l] > arr[r]) {
    COMPARISONS ++;
    swap(arr, l, r, animations)
  }

  let j = l + 1;
  let g = r - 1;
  let k = l + 1;
  let p = arr[l];
  let q = arr[r];

  while(k <= g){
    if(arr[k] < p){
      COMPARISONS ++;
      swap(arr, k, j, animations);
      j++;
    }
    else if(arr[k] >= q){
      COMPARISONS += 2;
      while(arr[g] > q && k < g) {
        COMPARISONS ++;
        g--;
      }
      swap(arr, k , g, animations);
      g--;
      COMPARISONS ++;
      if(arr[k] < p){
        swap(arr, k, j, animations);
        j++;
      }
    }
    k++;
  }
  j--;
  g++;
  swap(arr, l, j, animations);
  swap(arr, r, g, animations);
  return [j,g];
}

function swap(arr, i, j, animations){
  animations.push({
    swap:[i,j],
    select: [i,j],
    swaps: ++SWAPS,
    comparisons: COMPARISONS,
  })
  const temp = arr[i];
  const temp2 = arr[j];
  arr[i] = temp2;
  arr[j] = temp;
}
