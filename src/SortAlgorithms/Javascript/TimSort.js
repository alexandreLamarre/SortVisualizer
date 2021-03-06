var COMPARISONS;
var WRITES;
var AUXWRITES;

const RUN = 16;
/** **/
export default function getTimSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  COMPARISONS = 0;
  WRITES = 0;
  AUXWRITES = 0;
  timSort(arr, animations);
  return animations;
}

function timSort(arr, animations){
  const n = arr.length;
  for(let i = 0; i < n; i+= RUN){
    animations.push({select: [i]});
    insertionSort(arr, i, Math.min(i+RUN-1, n-1), animations);
  }

  for(let size = RUN; size < n; size *=2){
    for(let l = 0; l < n; l+= 2*size){
      // var m = l + i - 1;
      var r = Math.min(l+2*size -1, n-1);
      var m = Math.min(l + size -1, n-1);
      merge(arr, l, m, r, animations);
    }
  }
  return arr;
}

function insertionSort(arr,l,r,animations){
  for(let i = l+1; i <= r ; i++){
    const key = arr[i];
    var j = i - 1;
    while(j >= l && arr[j] > key){
      animations.push({
        set:[j+1, arr[j]],
        select: [j+1,j],
        comparisons: ++COMPARISONS,
        writes: ++WRITES,
      })
      arr[j+1] = arr[j];
      j --;
    }
    animations.push({
      set:[j+1, key],
      select: [i,j+1],
      writes: ++WRITES,
    });
    arr[j+1] = key;
  }
}

function merge(arr, l, m, r, animations){
  const len1 = m -l + 1;
  const len2 = r - m;
  const left = [];
  const right = [];
  for(let i = 0; i < len1; i++){
    left.push(arr[l+i]);
    AUXWRITES ++;
  }

  for(let i = 0; i < len2; i++){
    right.push(arr[m+1+i]);
    AUXWRITES ++;
  }
  animations.push({auxWrites: AUXWRITES});

  let i = 0;let j = 0; let k = l;

  while(i < len1 && j < len2){

    if(left[i] <= right[j]){
      animations.push({
        set: [k,left[i]],
        select: [k,i],
        comparisons: ++COMPARISONS,
        writes: ++WRITES,
      });
      arr[k] = left[i];
      i++;
    }
    else{
      animations.push({
        set: [k, right[j]],
        select: [k, j],
        writes: ++WRITES,
        comparisons: ++COMPARISONS,
      });
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while(i < len1){
    animations.push({set: [k, left[i]], select: [k, i], writes: ++WRITES});
    arr[k] = left[i];
    k++;
    i++;
  }

  while(j < len2){
    animations.push({set: [k, right[j]], select:[k,j], writes: ++WRITES});
    arr[k] = right[j];
    k++;
    j++;
  }

}
